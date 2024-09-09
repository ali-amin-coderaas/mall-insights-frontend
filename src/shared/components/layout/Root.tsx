import { PrimeReactContext } from "primereact/api";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { useContext, useState } from "react";
import { Outlet } from "react-router-dom";

import SideBar from "./SideBar";

const Root = () => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	const context = useContext(PrimeReactContext);

	if (!context) {
		throw new Error(
			"PrimeReactContext is not available. Ensure it is provided in your app."
		);
	}

	const { changeTheme } = context;

	const lightTheme = "lara-light-blue";
	const darkTheme = "lara-dark-blue";

	const toggleTheme = () => {
		const currentTheme = !isDarkMode ? lightTheme : darkTheme;
		const newTheme = isDarkMode ? lightTheme : darkTheme;
		changeTheme?.(currentTheme, newTheme, "theme-link", () => {
			setIsDarkMode(!isDarkMode);
		});
	};

	const start = (
		<div className="flex gap-4 align-items-center">
			<SideBar />
			<h1 className="pr-4">Mall Insights</h1>
		</div>
	);

	const end = (
		<div className="">
			<Button
				icon={isDarkMode ? "pi pi-sun" : "pi pi-moon"}
				onClick={toggleTheme}
				rounded
				color="var(--primary-color)"
				tooltip="Toggle Theme"
				tooltipOptions={{
					showDelay: 500,
					position: "bottom",
					mouseTrack: true,
					mouseTrackTop: 15,
				}}
			></Button>
		</div>
	);

	return (
		<div className="m-0">
			<header>
				<Menubar
					color="primary"
					className="  border-none border-noround flex-wrap px-4 md:px-8"
					start={start}
					end={end}
				/>
			</header>
			<main className="mx-4 md:mx-8 mt-4">
				<Outlet />
			</main>
		</div>
	);
};

export default Root;
