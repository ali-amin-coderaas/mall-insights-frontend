import { Button } from "primereact/button";
import { Ripple } from "primereact/ripple";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { setupInterceptors } from "../../../api/api";
import { useAuth } from "../../hooks/useAuth";
import { Links } from "../../Links";

const SideBar = () => {
	const [visible, setVisible] = useState(false);
	const { isLoggedIn, logout } = useAuth();
	setupInterceptors(logout);

	return (
		<div>
			<Sidebar visible={visible} onHide={() => setVisible(false)}>
				<div className="overflow-y-auto flex justify-content-between flex-column h-full pb-3">
					<ul className="list-none p-0 m-0 overflow-hidden">
						<li>
							<Link
								to={Links.HomePage()}
								className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
							>
								<i className="pi pi-home mr-2"></i>
								<span className="font-medium">Dashboard</span>
								<Ripple />
							</Link>
						</li>
						<li>
							<Link
								to={Links.AccountLinks.AccountsPage()}
								className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
							>
								<i className="pi pi-user mr-2"></i>
								<span className="font-medium">Accounts</span>
								<Ripple />
							</Link>
						</li>
					</ul>
					{isLoggedIn && (
						<Button
							className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:red-900 transition-duration-150 transition-colors w-full no-underline text-white"
							severity="danger"
							label="Logout"
							icon="pi pi-power-off"
							onClick={() => logout()}
						/>
					)}
				</div>
			</Sidebar>
			<Button icon="pi pi-bars" onClick={() => setVisible(true)} />
		</div>
	);
};

export default SideBar;
