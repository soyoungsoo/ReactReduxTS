import path from "../../../const/path";

export function getArticleURL(article_idx: number, section_idx: number) {
    return `${path.section}/${article_idx}?section_idx=${section_idx}`;
}