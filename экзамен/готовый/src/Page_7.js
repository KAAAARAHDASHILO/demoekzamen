import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { UseColorContext, UseContext } from "./Contract/Context";

const Page_7 = () => {
    const { color, setColor } = UseColorContext();
    const [w, w_] = useState(color);
    const { web3, Contract } = UseContext();
    const address = sessionStorage.getItem("address");
    const password = sessionStorage.getItem("password");
    const login = sessionStorage.getItem("login");
    const score = sessionStorage.getItem("score");
    const FIO = sessionStorage.getItem("FIO");
    const role = sessionStorage.getItem("role");
    const city = sessionStorage.getItem("city");
    const [mas, mass] = useState(["REQUESTS", "THEME"]);
    const [count2, count2_] = useState("");
    const [number2, number2_] = useState(0);
    const [dei, dei_] = useState("");
    const [mess, mess_] = useState("");
    const [messe, messe_] = useState("");
    const [time, time_] = useState("");
    const [hours, hours_] = useState("");
    const [rating, rating_] = useState("");
    const [score_two, score_two_] = useState("");
    const [click, click_] = useState("");
    sessionStorage.setItem("address", address);
    sessionStorage.setItem("password", password);
    sessionStorage.setItem("login", login);
    sessionStorage.setItem("score", score);
    sessionStorage.setItem("FIO", FIO);
    sessionStorage.setItem("role", role);
    sessionStorage.setItem("city", city);

    //setInterval(() => web3.eth.personal.unlockAccount(address, password), 30000);

    async function list(e) {

        if (e.target.value == "REQUESTS") {
            messe_("REQUESTS");
            let b = await Contract.methods.Additional_information().call();
            count2_(b[2]);
            if (b[2] != 0) {
                number2_(1);
                let m = await Contract.methods.Viewing_REQEST(0).call()
                mess_(m);
                var d = new Date(m[3] * 1000),
                    yyyy = d.getFullYear(),
                    mm = ("0" + (d.getMonth() + 1)).slice(-2),
                    dd = ("0" + d.getDate()).slice(-2),
                    hh = d.getHours(),
                    h = hh,
                    min = ("0" + d.getMinutes()).slice(-2);
                hours_(h + ":" + min);
                time_(dd + "." + mm + "." + yyyy + " г.");
                try {
                    rating_(await Contract.methods.Rating(m[0]).call({ from: address }) / 100);
                } catch { rating_("NaN") }
            }
        }
        if (e.target.value == "THEME") {
            setColor(!w);
            w_(!w);
        }
        e.target.value = "";
    }

    async function exit(a) {
        if (a == "dei")
            dei_("");

        if (a == "messe")
            messe_("");

    }

    async function Viewing_MESSAGES(b) {
        if (b == "+") {
            if ((number2 + 1) <= count2) {
                number2_(number2 + 1);
                let m = await Contract.methods.Viewing_REQEST(number2).call()
                mess_(m);
                var d = new Date(m[3] * 1000),
                    yyyy = d.getFullYear(),
                    mm = ("0" + (d.getMonth() + 1)).slice(-2),
                    dd = ("0" + d.getDate()).slice(-2),
                    hh = d.getHours(),
                    h = hh,
                    min = ("0" + d.getMinutes()).slice(-2);
                hours_(h + ":" + min);
                time_(dd + "." + mm + "." + yyyy + " г.");
            }
        }
        if (b == "-") {
            let a = number2 - 1;
            if (a > 0) {
                number2_(a);
                a--;
                let m = await Contract.methods.Viewing_REQEST(a).call()
                mess_(m);
                var d = new Date(m[3] * 1000),
                    yyyy = d.getFullYear(),
                    mm = ("0" + (d.getMonth() + 1)).slice(-2),
                    dd = ("0" + d.getDate()).slice(-2),
                    hh = d.getHours(),
                    h = hh,
                    min = ("0" + d.getMinutes()).slice(-2);
                hours_(h + ":" + min);
                time_(dd + "." + mm + "." + yyyy + " г.");
            }
        }
    }

    async function The_bank_response(a) {
        click_(a);
        if (a == 2)
            a = 0;
        try {
            await Contract.methods.The_bank_response(number2 - 1, a).send({ from: address });
            mess_(await Contract.methods.Viewing_REQEST(number2 - 1).call());
            if (a == 2) {
                await web3.eth.sendTransaction({ from: address, to: mess[5], value: mess[1] * 1000000000000000000 })
                let j = await web3.eth.getBalance(address);
                score_two_(j / 1000000000000000000);
            }
        }
        catch {
            alert("The error can serve as:\n1. A response was sent to this request earlier");
        }
        click_("");
    }

    return (
        <>
            <header className="navbar_two">
                <select className="text" onChange={list}>
                    <option value='' hidden>OPTIONS</option>
                    {mas.map((arr, i) => <option key={i} value={String(arr)}>
                        {arr}
                    </option>)}</select>
                <Link to="./Page_1"><button className="text">EXIT</button></Link>
            </header>
            <br />

            <div style={{ float: "left" }}>
                <div className="message_two5" style={{ marginLeft: "40px" }}><br />
                    <div style={{ fontSize: "45px", fontWeight: "bolder" }}><center>BANK'S PERSONAL PAGE</center></div><br />
                    &nbsp;Login:&nbsp;{login}<br />
                    {score_two == "" && <div>&nbsp;Current balance:&nbsp;{Math.round(parseFloat(score) * 100) / 100}<br /></div>}
                    {score_two != "" && <div>&nbsp;Current balance:&nbsp;{Math.round(parseFloat(score_two) * 100) / 100}<br /></div>}<br />
                </div><br />
            </div>

            <div style={{ float: "right" }}>

                {messe == "REQUESTS" && <div>
                    <div style={{ float: "right", marginRight: "30px", fontSize: "10px", fontWeight: "bolder" }}>{number2 < count2 && (<button className="text_two" onClick={() => Viewing_MESSAGES("+")}>&#9650;</button>)}
                        {number2 == count2 && (<button className="text_two4">&#9650;</button>
                        )}
                        <br /> {number2 > 1 && (<button className="text_two" onClick={() => Viewing_MESSAGES("-")}>&#9660;</button>)}
                        {number2 == 1 && (<button className="text_two4">&#9660;</button>
                        )}
                        {count2 == 0 && (<button className="text_two4">&#9660;</button>
                        )}<br /></div>
                    <div style={{ float: "right", display: "flex" }}>
                        {count2 != 0 && <div className="message_six" style={{ marginRight: "10px", fontSize: "20px", fontWeight: "bolder" }}><div style={{ float: "right" }}>{number2}</div></div>}
                        <div className="message_two3">
                            <div style={{ float: "right", marginRight: "20px" }}><button className="text_two" onClick={() => exit("messe")}>&#10006;</button></div>
                            &emsp;Total: {count2}<br />
                            {count2 != 0 && <div style={{ backgroundColor: "#ffffff" }}>
                                &nbsp;Title:&nbsp;{mess[0]}<br />
                                &nbsp;The amount:&nbsp;{mess[1]}<br />
                                &nbsp;Term: {mess[2]}&nbsp;mines<br />
                                {rating != "NaN" && <div>&nbsp;Rating:&nbsp;{rating}<br /></div>}
                                {mess[4] == 1 && <div style={{ color: "#B22222" }}>&nbsp;Awaiting a response<br /></div>}
                                {mess[4] == 2 && <div style={{ color: "#32CD32" }}>&nbsp;The response has been sent<br /></div>}
                                &nbsp;{time}<br />
                                &nbsp;{hours}<br /></div>}
                            {count2 != 0 && click != 2 && <button className="text" onClick={() => The_bank_response(2)}>Confirm</button>}
                            {count2 != 0 && click == 2 && <button className="textf" >Confirm</button>}
                            {count2 != 0 && click != 1 && <div style={{ float: "right", marginRight: "20px" }}><button className="text" onClick={() => The_bank_response(1)}>Reject</button></div>}
                            {count2 != 0 && click == 1 && <div style={{ float: "right", marginRight: "20px" }}><button className="textf" >Reject</button></div>}
                        </div></div>

                </div>}


            </div>

        </>
    );
};
export default Page_7;