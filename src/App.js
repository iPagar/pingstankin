import React, { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import {
	View,
	Panel,
	PanelHeaderSimple,
	Group,
	Header,
	CardGrid,
	Card,
	Div,
	List,
	Link,
	Button,
	Spinner
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { VictoryChart, VictoryLine } from "victory";
import openSocket from "socket.io-client";
import logo from "./img/logo.jpg";
import logoblack from "./img/logoblack.png";

const address = `https://ipagar.ddns.net:8083`;
const socket = openSocket(address);

const App = () => {
	const [loadTimes, setLoadTimes] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [notifyTime, setNotifyTime] = useState("");

	function loopCheck() {
		socket.emit("auth", { sign: window.location.search });

		socket.on("times", function(data) {
			setLoadTimes(data);
			setIsLoading(false);
		});

		socket.on("notify", function(data) {
			setNotifyTime(data.end_time);
		});
	}

	useEffect(() => {
		loopCheck();
		bridge.subscribe(e => {
			if (e.detail.type === "VKWebAppViewRestore");
			{
				loopCheck();
			}
		});
	}, []);

	function showLoading() {
		return (
			<Div
				style={{
					color: "var(--text_primary)",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					marginTop: 20
				}}
			>
				<img src={logo} alt="logo" />
				<Spinner
					size="large"
					style={{
						marginTop: 20
					}}
				/>
			</Div>
		);
	}

	const notify = () => {
		bridge
			.sendPromise("VKWebAppAllowMessagesFromGroup", {
				group_id: 183639424,
				key: "dBuBKe1"
			})
			.then(() => {
				socket.emit("notify");
			});
	};

	return (
		<View activePanel="home" header={false}>
			<Panel id="home" centered separator={false}>
				<PanelHeaderSimple>Станкин Доступен?</PanelHeaderSimple>
				<Div>
					{(!isLoading && (
						<React.Fragment>
							<Div
								style={{
									color: "var(--text_primary)",
									display: "flex",
									flexDirection: "column",
									alignItems: "center"
								}}
							>
								<img src={logo} alt="logo" />

								{(loadTimes[loadTimes.length - 1].loadtime <
									10 && (
									<Header>
										<div
											style={{
												color:
													"var(--button_commerce_background)"
											}}
										>
											ДОСТУПЕН
										</div>
									</Header>
								)) || (
									<Header>
										<div
											style={{
												color: "var(--destructive)"
											}}
										>
											НЕ ДОСТУПЕН
										</div>
									</Header>
								)}
							</Div>
							<List>
								{loadTimes[loadTimes.length - 1].loadtime <
									10 || (
									<React.Fragment>
										<Div>
											<Button
												stretched
												size="l"
												onClick={notify}
											>
												Оповестить в течение двух часов
											</Button>
										</Div>
										{notifyTime && (
											<div
												style={{
													display: "flex",
													flexDirection: "column",
													alignItems: "center"
												}}
											>
												<Header
													mode={"secondary"}
												>{`Сообщим до ${notifyTime}`}</Header>
											</div>
										)}
									</React.Fragment>
								)}
								<Div>
									<Button
										stretched
										size="l"
										mode="secondary"
										href="https://edu.stankin.ru"
									>
										Перейти на сайт
									</Button>
								</Div>
							</List>
							<div
								style={{
									color: "var(--text_primary)",
									display: "flex",
									flexDirection: "column",
									alignItems: "center"
								}}
							>
								<Header>График времени отклика</Header>
							</div>
							<Group separator="hide">
								<CardGrid>
									<Card size="l">
										<VictoryChart domain={{ y: [0, 10.1] }}>
											<VictoryLine
												data={loadTimes}
												interpolation="monotoneX"
												// data accessor for x values
												x="checktime"
												// data accessor for y values
												y={loadtimes =>
													+loadtimes.loadtime
												}
											/>
										</VictoryChart>
									</Card>
								</CardGrid>
							</Group>
						</React.Fragment>
					)) ||
						showLoading()}
				</Div>
			</Panel>
		</View>
	);
};

export default App;
