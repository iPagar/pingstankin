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
	Spinner,
	Placeholder,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { VictoryChart, VictoryLine } from "victory";
import openSocket from "socket.io-client";
import logo from "./img/logo.jpg";
import logoblack from "./img/logoblack.png";
import Icon44SmileOutline from "@vkontakte/icons/dist/44/smile_outline";

const App = () => {
	return (
		<View activePanel="home" header={false}>
			<Panel id="home" centered separator={false}>
				<PanelHeaderSimple>Станкин Доступен?</PanelHeaderSimple>
				<Div>
					<Placeholder
						icon={<Icon44SmileOutline width={56} height={56} />}
					>
						Живем дальше!
					</Placeholder>
				</Div>
			</Panel>
		</View>
	);
};

export default App;
