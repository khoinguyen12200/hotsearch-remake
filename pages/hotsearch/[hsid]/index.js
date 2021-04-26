import { Component } from "react";
import {
	getDayOfWeek,
	formatNumbers,
	getIdFromSearch,
	getHotSearchUrl,
	getHotSearchDateUrl,
	getdatesql,
} from "../../../components/Const";
import { ImFire, ImNewspaper } from "react-icons/im";
import { AiOutlineFundView } from "react-icons/ai";
import { FacebookComment, ListNews } from "../../../components/Hotsearch";
import { decode } from "html-entities";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import Head from "next/head";

export async function getServerSideProps(context) {
	const res = await fetch(
		`http://localhost:3000/api/hotsearch/${context.params.hsid}`
	);

	const { data } = await res.json();
	return { props: { hotSearch: data } };
}

export default class HotSearchItem extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { hotSearch } = this.props;
		const link = hotSearch != null ? getHotSearchUrl(hotSearch.id) : "";
		const groupLink =
			hotSearch != null ? getHotSearchDateUrl(hotSearch.date) : "";
		const titlePage = `${hotSearch.title} #${hotSearch.rank} tìm kiếm`;
		if (hotSearch != null) {
			return (
				<div className="hot-search-page">
					<Head>
						<title>{titlePage}</title>
						<meta name="Keywords" content={hotSearch.title} />
					</Head>
					<div className="hotsearch-header">
						<h1 className="hs-title">{titlePage}</h1>
						<ul className="header-list">
							<li className="hs-date">
								<MdDateRange />
								<p>{getDayOfWeek(hotSearch.date)}</p>
							</li>
							<li className="hs-view">
								<AiOutlineFundView />
								<p>{formatNumbers(hotSearch.view)} lượt xem</p>
							</li>
							<li className="hs-articles">
								<ImNewspaper />
								<p>{hotSearch.articles.length} bài viết</p>
							</li>
						</ul>
					</div>
					<Articles articles={hotSearch.articles} />

					<FacebookComment
						link={link}
						title={`Bình luận về "${hotSearch.title}"`}
					/>

					<FacebookComment
						link={groupLink}
						title={`Bình luận về ngày ${getDayOfWeek(
							hotSearch.date
						)}`}
					/>
				</div>
			);
		} else {
			return (
				<p className="not-found-hotsearch">
					{
						"Không tìm thấy hot search này, có thể từ khóa này đã thay đổi"
					}
				</p>
			);
		}
	}
}
export function Articles(props) {
	const { articles } = props;
	return (
		<div className="list-article">
			{articles.map((item, index) => (
				<Article article={item} key={index} />
			))}
		</div>
	);
}
export function Article(props) {
	const { article } = props;
	return (
		<div className="article-item">
			<div className="article-content">
				<h4 className="article-title">{decode(article.title)}</h4>
				<div className="content">
					<img className="image" src={article.image} alt="aritcle" />
					<p className="snippet">{decode(article.snippet)}</p>
				</div>
			</div>
			<div className="source">
				<a target="_blank" href={article.url}>
					{" "}
					{article.source}
					<FaExternalLinkSquareAlt />
				</a>
			</div>
		</div>
	);
}
