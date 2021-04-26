import React from "react";
import { useRouter } from "next/router";
import { HotSearchGroup } from "../../components/HotSearch";
import {
	formatDate,
	getVariableFromSearch,
	getHotSearchDateUrl,
	addSubtractDate,
	getdatesql,
} from "../../components/Const";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

export async function getServerSideProps(context) {
	const res = await fetch(
		`http://localhost:3000/api/hotsearch/group/${context.params.hsdate}`
	);

	const { data } = await res.json();
	return { props: { date: context.params.hsdate, data } };
}

export default function DailyHotSearch(props) {
    const router = useRouter();
    const data = React.useMemo(()=>{
        return props.data
    },[props])
	const date = React.useMemo(() => {
		var d = new Date();
		const datestring = props.date;
		const year = datestring.substring(0, 4);
		const month = datestring.substring(4, 6);
		const date = datestring.substring(6, 8);
		d.setFullYear(year);
		d.setMonth(month - 1);
		d.setDate(date);
		return formatDate(d);
	}, [props]);

	function redirect(value) {
		router.push(getHotSearchDateUrl(value));
	}
	function onSubmit(e) {
		router.push(getHotSearchDateUrl(date));
	}
	function addDate(add) {
		const d = new Date(date);
		var newDate = addSubtractDate(d, add);
		router.push(getHotSearchDateUrl(newDate));
	}

	return (
		<div className="daily-hot-search">
			<div className="daily-header">
				<button onClick={() => addDate(-1)} className="arrow">
					<BiLeftArrow />
				</button>
				<form onSubmit={(e) => onSubmit(e)} className="input-row">
					<input
						className="date-picker"
						type="date"
						value={date}
						onChange={(e) => {
							redirect(e.target.value);
						}}
					/>
					<button className="submit">
						Search
					</button>
				</form>
				<button onClick={() => addDate(1)} className="arrow">
					<BiRightArrow />
				</button>
			</div>

			<div className="daily-main-content">
				{data && (
					<HotSearchGroup
						list={data}
						date={new Date(date)}
					/>
				)}
			</div>
		</div>
	);
}
