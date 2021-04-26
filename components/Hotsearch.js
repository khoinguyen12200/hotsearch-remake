import React, { Component } from "react";
import Link from 'next/link';
import { decode } from "html-entities";
import { motion } from "framer-motion";
import {
	getDayOfWeek,
	formatNumbers,
	getdatesql,
	getHotSearchDateUrl,
	isMobile,
} from "./Const";

import { AiTwotoneStar } from "react-icons/ai";



export default class HotSearchRow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			focus: false,
			extended: false,
			extension: false,
		};
		this.setFocus = this.setFocus.bind(this);
		this.setExtended = this.setExtended.bind(this);
		this.holdTime = 1000;
		this.timeout = null;
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		const { onContentClick, hotSearch } = this.props;
		if (onContentClick) {
			this.props.onContentClick(hotSearch.id);
		}
	}
	setFocus(focus) {
		this.setState({ focus: focus });

		if (this.timeout != null) clearTimeout(this.timeout);
	}
	componentDidUpdate(prevProps, prevState) {
		const oldFocus = prevState.focus;
		const focus = this.state.focus;

		if (oldFocus != focus) {
			this.timeout = setTimeout(() => {
				this.setExtended();
			}, this.holdTime);
		}
	}
	componentWillUnmount() {
		if (this.timeout) {
			clearTimeout(this.timeout);
		}
	}
	setExtended() {
		const focus = this.state.focus;

		if (focus) {
			this.setState({ extension: true, extended: true });
		} else {
			this.setState({ extended: false });
			setTimeout(() => {
				this.setState({ extension: false });
			}, this.holdTime);
		}
	}
	render() {
		let { hotSearch } = this.props;
		const id = hotSearch.id;
		const date = hotSearch.date;
		var title = hotSearch.title;
		var numbers = hotSearch.view;
		var image = hotSearch.image;
		var describe =
			hotSearch.articles.length > 0 ? hotSearch.articles[0].title : "";
		var articles = hotSearch.articles;
		var rank = hotSearch.rank;

		describe = decode(describe);

		var numView = viewToInt(numbers);

		var fire = null;
		const star = <AiTwotoneStar />;

		if (numView >= 15000) fire = <div className="fire warm">{star}</div>;
		if (numView >= 100000)
			fire = (
				<div className="fire hot">
					{star}
					{star}
				</div>
			);
		if (numView >= 1000000)
			fire = (
				<div className="fire superhot">
					{star}
					{star}
					{star}
				</div>
			);

		const { extended, focus, extension } = this.state;


		const variants = {
			initial: {
				width: "100%",
				margin: "0px",
				boxShadow: "0 0 10px 0px rgba(0, 0, 0, 0)",
				transition: { type: "tween", duration: 0.3 },
			},
			animate: {
				width: "120%",
				margin: "20px",
				boxShadow: "0px 0px 9px 1px rgba(0, 0, 0, 0.315)" ,
				transition: { type: "tween", duration: 0.3 },
			},
		};

		if (!isMobile()) {
			return (
				<motion.div
					variants={variants}
					initial={"initial"}
					animate={extended ? "animate" : "initial"}
					onMouseEnter={() => this.setFocus(true)}
					onMouseLeave={() => this.setFocus(false)}
					className="hot-search-row "
				>
					<Link href={`/hotsearch/${id}`}>
						<a className="hs-main-content">
							<div className="rank">
								<h3 className="number">{rank}</h3>
								{fire}
							</div>
							<div className="content">
								<h2 className="main">{title}</h2>
								<p className="describe">{decode(describe)}</p>
							</div>
							<div className="numbers">
								<h2 className="main">
									{formatNumbers(numbers)}
								</h2>
								<p className="describe">lượt tìm kiếm</p>
							</div>
							<div>
								<img
									className="image"
									alt="Not found"
									src={image}
								/>
							</div>
						</a>
					</Link>

					<motion.div
						className="extended-title"
						initial={{ height: "0px", margin: "0px" }}
						animate={
							extended
								? { height: "auto", margin: "10px" }
								: { height: "0px", margin: "0px" }
						}
						transition={{
							type: "tween",
							duration: this.holdTime / 1000,
						}}
					>
						Các tin tức có liên quan
					</motion.div>

					<div className="progress-bar-wrapper">
						<motion.div
							className="progress-bar"
							initial={{ width: "0" }}
							animate={{ width: focus ? "auto" : "0" }}
							transition={{
								type: "tween",
								duration: this.holdTime / 1000,
							}}
						/>
					</div>

					<motion.div
						initial={{ height: "0" }}
						animate={{ height: extended ? "auto" : "0" }}
						transition={{
							type: "tween",
							duration: this.holdTime / 1000,
						}}
						className="extended-content"
					>
						{extension && <ListNews articles={articles} />}
					</motion.div>
				</motion.div>
			);
		} else {
			return (
				<Link href={`/hotsearch/${id}`}>
					<a className="hot-search-row-moblie">
						<div
							onClick={this.handleClick}
							className="hs-main-content"
						>
							<div className="wrapSpace">
								<div className="space1">
									<h3 className="rank">{rank}</h3>
								</div>
								<div className="space2">
									<div className="row">
										<p className="title">{title}</p>
										{fire}
									</div>
									<p className="number">
										{formatNumbers(numbers)} lượt tìm kiếm
									</p>
								</div>
							</div>

							<div className="space3">
								<img
									className="image"
									alt={title}
									src={image}
								/>
							</div>
						</div>
					</a>
				</Link>
			);
		}
	}
}

export class HotSearchGroup extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		var { date, list } = this.props;

		date = date
			? date
			: list
			? list[0]
				? list[0].date
				: new Date()
			: new Date();
		const groupLink = getHotSearchDateUrl(date);
		return (
			<div className="hot-search-group">
				<p className="date">{getDayOfWeek(date)}</p>

				{list && list.length != 0 && (
					<div className="list">
						{list.map((item, index) => (
							<HotSearchRow
								onContentClick={this.handleContextClick}
								hotSearch={item}
								key={index}
							/>
						))}
					</div>
				)}
				<div className="commentSpace">
					<FacebookComment link={groupLink} />
				</div>
			</div>
		);
	}
}
function viewToInt(views) {
	var str = views.toString() || "";
	str = str.replace("M+", "000000").replace("K+", "000");

	return parseInt(str);
}

export function FacebookComment(props) {
	const { link, title } = props;

	React.useEffect(() => {
		if (window.FB) {
			window.FB.XFBML.parse();
		}
	});

	return (
		<div className="facebookComment">
			<div className="title">{title}</div>

			<div
				className="fb-comments"
				data-href={link}
				data-width="100%"
				data-numposts="5"
			></div>
		</div>
	);
}

export class ListNews extends React.Component {
	render() {
		const articles = this.props.articles;
		return (
			<div stlye={{ paddingBottom: 15 }} className="daily_row_news">
				<div>
					<p className="newsTitle">Kết quả tìm kiếm phổ biến</p>
				</div>

				<div className="news">
					{articles.map((article, i) => {
						return <News key={i} article={article} />;
					})}
				</div>
			</div>
		);
	}
}

class News extends Component {
	render() {
		const { article } = this.props;
		return (
			<a target="_blank" href={article.url} className="NewsItem">
				<img src={article.image} />
				<div className="text">
					<h6 className="title">{decode(article.title)}</h6>
					<p className="snippet">{decode(article.snippet)}</p>
					<p className="source">{article.source}</p>
				</div>
			</a>
		);
	}
}
