import React, {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router";
import qs from "query-string";
import {GetArticleOptionType, ListType} from "../../models/article";
import ArticleAPI from "../../api/article";

const withNewsList = (WrappedComponent: (p: any) => React.ReactElement) => {
    const Component = (props: any) => {
        const history = useHistory();
        const location = useLocation();
        const search = qs.parse(location.search);
        const state = search.state;
        const keyword = search.keyword?.toString() || '';
        const option = Number(search.option || 0);
        const page = Number(search.page?.toString() || 1);

        const count = 15;
        const [searchType, setSearchType] = useState(option); // 0: 제목 1: 내용
        const [list, setList] = useState<ListType>({} as ListType);

        let params = window.$Global.getParams();
        let keys = Object.keys(params);

        let exceptionKey = ['option', 'keyword', 'page'];
        let commonQuery = '';

        keys.map((item, idx) => {
            if (!exceptionKey.find(item2 => item === item2)) {
                if (idx > 0) {
                    commonQuery += '&';
                }
                commonQuery += `${item}=${params[item]}`;
            }
        });

        useEffect(() => {
            getList();
        }, [page]);

        const getList = () => {
            let params: GetArticleOptionType = {
                page: page,
                count: count,
            };

            if (state) {
                params.state = Number(state);
            }

            if (keyword) {
                params.keyword = keyword;
                params.option = searchType;
            }

            ArticleAPI.getArticleList(params).then((res: ListType) => {
                if (res.items.length === 0 && page > 1) { // 삭제 시 필요한 조건문, 마지막 끝 페이지 데이터가 없을 시 page를 1로 변경
                    changePage(1);
                } else {
                    setList(res);
                }
            });
        };

        const changePage = (page:number) => {
            history.push(`?${commonQuery}&option=${searchType}&keyword=${keyword}&page=${page}`);
        }

        const searchList = (keyword: string) => {
            history.push(`?${commonQuery}&option=${searchType}&keyword=${keyword}&page=${1}`);
        };

        const combinedProps = {
            ...props,
            count,
            searchType,
            setSearchType,
            keyword,
            list,
            getList,
            searchList,
            page,
            changePage
        };

        return <WrappedComponent {...combinedProps} />;
    };
    return Component;
};

export default withNewsList;
