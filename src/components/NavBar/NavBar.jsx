import React, { useState, useEffect, useRef } from "react";
import { TiThList } from "react-icons/ti";
import "./NavBar.css";
import { useRecoilState } from 'recoil';
import { groupState, orderValueState } from '../../Recoil/atoms';

const NavBar = () => {
	const [displayOnClick, setDisplayOnClick] = useState(false);
	const [group, setGroup] = useRecoilState(groupState);
	const [orderValue, setOrderValue] = useRecoilState(orderValueState);
	const dropdownRef = useRef(null); // Ref for dropdown menu

	const getGroup = () => localStorage.getItem("group") || "status";
	const getOrder = () => localStorage.getItem("order") || "priority";

	// Effect to load initial group and order values
	useEffect(() => {
		setGroup(getGroup());
		setOrderValue(getOrder());
	}, [setGroup, setOrderValue]);

	// Handle clicks outside the dropdown to close it
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setDisplayOnClick(false);
			}
		};

		// Add event listener when dropdown is open
		if (displayOnClick) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		// Cleanup the event listener when dropdown is closed
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [displayOnClick]);

	const handleGroupValue = (e, isGroup) => {
		const value = e.target.value;
		if (isGroup) {
			setGroup(value);
			localStorage.setItem("group", value);
		} else {
			setOrderValue(value);
			localStorage.setItem("order", value);
		}
		setDisplayOnClick(false);
	};

	return (
		<div className="top-header" style={{ paddingLeft: "13px" }}>
			<div className="displayButton">
				<button
					className="p-10 f-16 btn"
					onClick={() => setDisplayOnClick(!displayOnClick)}
				>
					<TiThList /> Display
				</button>
				{displayOnClick && (
					<div className="dropOnClick flex-gap-10 p-10" ref={dropdownRef}>
						<div className="selectGroup flex-sb">
							<span style={{ fontSize: "14px", color: "#555B5A", paddingRight: "8px" }}>Grouping</span>
							<select
								value={group}
								onChange={(e) => handleGroupValue(e, true)}
								className="selectStyle"
								name="group"
								id="group"
							>
								<option value="status">Status</option>
								<option value="user">User</option>
								<option value="priority">Priority</option>
							</select>
						</div>
						<div className="selectGroup flex-sb">
							<span style={{ fontSize: "14px", color: "#555B5A", paddingRight: "8px" }}>Ordering</span>
							<select
								value={orderValue}
								onChange={(e) => handleGroupValue(e, false)}
								className="selectStyle"
								name="order"
								id="order"
							>
								<option value="priority">Priority</option>
								<option value="title">Title</option>
							</select>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default NavBar;
