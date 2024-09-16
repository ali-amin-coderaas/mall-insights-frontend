import { Link } from "react-router-dom";
import LeMallLogo from "../../../assets/images/logos/accounts/le-mall-logo.jpg";

import { Links } from "../../../shared/Links";
import { Account } from "../types/accountInterfaces";

export const gridAccount = (item: Account) => {
	return (
		<div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={item.id}>
			<Link
				to={Links.AccountLinks.SingleAccount(item.id)}
				className="no-underline list-none text-color"
			>
				<div className="p-4 border-1 surface-border surface-card border-round">
					<div className="flex flex-wrap align-items-center justify-content-between gap-2">
						<div className="flex align-items-center gap-2">
							<i className="pi pi-tag"></i>
							<span className="font-semibold">{item.accountType}</span>
						</div>
					</div>
					<div className="flex flex-column align-items-center gap-3 py-5">
						<img
							className="w-9 shadow-2 border-round"
							src={LeMallLogo}
							alt={item.name}
						/>
						<div className="text-2xl font-bold">{item.name}</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export const listAccount = (item: Account) => {
	return (
		<div className="col-12" key={item.id}>
			<div
				className={
					"flex flex-column xl:flex-row xl:align-items-start p-4 gap-4"
				}
			>
				<img
					className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
					src={LeMallLogo}
					alt={item.name}
				/>
				<div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
					<div className="flex flex-column align-items-center sm:align-items-start gap-3">
						<div className="text-2xl font-bold text-900">{item.name}</div>
						<div className="flex align-items-center gap-3">
							<span className="flex align-items-center gap-2">
								<i className="pi pi-tag"></i>
								<span className="font-semibold">{item.accountType}</span>
							</span>
						</div>
					</div>
					<div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2"></div>
				</div>
			</div>
		</div>
	);
};
