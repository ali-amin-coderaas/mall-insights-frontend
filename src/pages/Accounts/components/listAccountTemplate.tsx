import { classNames } from "primereact/utils";
import LeMallLogo from "../../../assets/images/logos/accounts/le-mall-logo.jpg";
import { Account } from "../types/accountInterfaces";

export const ListItemTemplate = (item: Account) => {
	return (
		<div className="col-12" key={item.id}>
			<div
				className={classNames(
					"flex flex-column xl:flex-row xl:align-items-start p-4 gap-4"
				)}
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
							{/* <Tag
								value={item.inventoryStatus}
								severity={getSeverity(item)}
							></Tag> */}
						</div>
					</div>
					<div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2"></div>
				</div>
			</div>
		</div>
	);
};
