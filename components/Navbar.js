import React from "react";
import Link from "next/link";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { isMobile,getHotSearchDateUrl } from "./Const.js";

export default function Navbar(props) {
	return (
		<div className="navbar">
			<div className="space-left">
				<Link href="/">
					<a className="webname">
						{!isMobile() ? (
							<img src="/icons/full_logo.svg" alt="logo" />
						) : (
							<img src="/icons/small_logo.svg" alt="logo" />
						)}
					</a>
				</Link>
				<Link href={getHotSearchDateUrl(new Date())}>
					<a className="nav-item">
						<span className="text">TÌM KIẾM</span>
					</a>
				</Link>
			</div>

			<div className="select-space">
				<Link href="/question">
					<a className="question">
						<div className="icon-container">
							<BsFillInfoCircleFill />
						</div>
					</a>
				</Link>
			</div>
		</div>
	);
}
