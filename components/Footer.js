import Link from "next/link";
import { EMAIL } from "./Const";

export default function Footer(props) {
	return (
		<div className="footer">
			<div className="space1">
				<ul>
					<li>
						<Link href="/question#aboutus">
							<a className="footer-item">Về trang web này</a>
						</Link>
					</li>

					<li>
						<Link href="/question#whatishotsearch">
							<a className="footer-item">Hot search là gì ?</a>
						</Link>
					</li>

					<li>
						<Link href="/question#contactus">
							<a className="footer-item">Liên hệ</a>
						</Link>
					</li>
				</ul>
			</div>
			<div className="space2">
				<h5>
					Chào bạn ! Mình là dev, nếu bạn là nhà tuyển dụng thì hãy liên lạc theo email:{" "}
					{EMAIL}
				</h5>
			</div>
		</div>
	);
}
