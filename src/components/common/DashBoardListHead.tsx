import React, {useState} from "react";
import "./css/DashBoardListHead.scss";

interface Props {
	checkbox?: boolean,
	allCheck?: boolean,
	count: number,
	countTxt: string,
	countUnit?: string,
	initKeyword: string,
	option?: OptionType[],
	searchType: number,
	setSearchType: (type: number) => void,
	searchAPI: (str: string) => void
	onChangeAllCheck?: (event: HTMLInputElement) => void,
	onDelete?: () => void
}

interface OptionType {
	text: string,
	value: number
}

function DashBoardListHead({checkbox, allCheck, count, countTxt, countUnit, option, initKeyword, searchType, setSearchType, searchAPI, onChangeAllCheck, onDelete}: Props) {
	const [inputKeyword, setInputKeyword] = useState(initKeyword);

	return (
		<div id="DashBoardListHead" className={checkbox ? '' : 'center'}>
			{
				checkbox
				&&
				<div className={`all_select_area`}>
					<label htmlFor="all_check">
						<input type="checkbox" id="all_check" checked={allCheck} onClick={e => onChangeAllCheck && onChangeAllCheck(e.target as HTMLInputElement)}/>전체선택
					</label>
					<button className="btn_del" onClick={e => onDelete && onDelete()}>삭제</button>
				</div>
			}
			<div className="search_area">
				<select value={searchType} onChange={e => setSearchType(Number(e.target.value))}>
					{
						option
						?
							<>
							{
								option.map((item, idx) => <option key={idx} value={item.value}>{item.text}</option>)
							}
							</>
						:
							<>
								<option value={0}>제목</option>
								<option value={1}>내용</option>
							</>
					}
				</select>
				<input type="text"
					   value={inputKeyword}
					   onKeyUp={e => e.key === 'Enter' && searchAPI(inputKeyword)}
					   onChange={e => setInputKeyword(e.target.value)}
				/>
				<button className="icon_search ir_txt" onClick={() => searchAPI(inputKeyword)}>검색 버튼</button>
			</div>
			<div className="count_area">
				<p className="txt">{countTxt}</p>
				<p className="count">{count}{countUnit || '건'}</p>
			</div>
		</div>
	)
}

export default DashBoardListHead;