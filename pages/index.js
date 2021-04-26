import styles from "../styles/Home.module.css";
import React from "react";
import { getdatesql, addSubtractDate } from "../components/Const";
import { HotSearchGroup } from "../components/Hotsearch";
import ThemeContext, { themes } from "../components/ThemeContext";
import Selector from "../components/Selector";

export async function getServerSideProps() {
	const res = await fetch(
		`http://localhost:3000/api/hotsearch/group/${getdatesql(new Date())}`
	);

	const { data } = await res.json();

	return { props: { defaultData: data } };
}

export default function Home({ defaultData }) {
	const [data, setData] = React.useState([
		{ date: new Date(), list: defaultData },
	]);

	const [loading, setLoading] = React.useState(false);

	async function handleSeeMore() {
		setLoading(true);
		const lastDate = addSubtractDate(new Date(), -data.length);
		const result = await fetch(
			`http://localhost:3000/api/hotsearch/group/${getdatesql(lastDate)}`
		);
		const resultJson = await result.json();

		const group = { date: lastDate, list: resultJson.data };
		const newArr = data.concat(group);
		setData(newArr);
		setLoading(false);
	}

	return (
		<div className={styles.container}>
			<div className="main-content">
				<div className="select-space">
					<ThemeSelector />
				</div>
				<h1 className="title">
					<img
						className="vietnamflag"
						src="/icons/vietnam-flag.png"
					/>
					Hot Search Việt Nam
				</h1>

				<div className="list-hot-search">
					{data.map((group) => (
						<HotSearchGroup
							key={group.date}
							date={group.date}
							list={group.list}
						/>
					))}
				</div>
				<div className="button-space">
					<button
						disabled={loading}
						onClick={handleSeeMore}
						className="see-more"
					>
						Xem thêm
					</button>
				</div>
			</div>
		</div>
	);
}

function ThemeSelector() {
	const { theme, setTheme } = React.useContext(ThemeContext);
	if (typeof document !== "undefined") {
		return (
			<Selector
				onChange={(value) => {
					setTheme(value);
				}}
				activeTextColor="#fff"
				textColor="#aaa"
				backColor="#fc8600"
				defaultValue={theme}
				options={[
					{ title: "Light", value: themes.light },
					{ title: "Dark", value: themes.dark },
				]}
			/>
		);
	} else {
		return null;
	}
}
