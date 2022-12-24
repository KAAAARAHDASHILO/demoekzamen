import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { UseColorContext, UseContext } from "./Contract/Context";
import pusk from './pusk.gif'

const Page_1 = () => {
    const { color, setColor } = UseColorContext();
    const { web3, Contract } = UseContext();
    const [address, address_] = useState("");
    const [score, score_] = useState("");
    const [password, passwords] = useState("");
    const [login, logins] = useState("");
    const [FIO, FIO_] = useState("");
    const [role, role_] = useState("");
    const [count, count_] = useState("");
    const [number, number_] = useState(0);
    const [book, book_] = useState("");
    const [pus, pus_] = useState("true");
    const [city, city_] = useState("");
    const [shop, shop_] = useState("");
    const [rating, rating_] = useState("");
    const [klick, klick_] = useState(0);
    sessionStorage.setItem("address", address);
    sessionStorage.setItem("password", password);
    sessionStorage.setItem("login", login);
    sessionStorage.setItem("score", score);
    sessionStorage.setItem("FIO", FIO);
    sessionStorage.setItem("role", role);
    sessionStorage.setItem("city", city);
    sessionStorage.setItem("shop", shop);
    sessionStorage.setItem("rating", rating);

    async function exit(a) {
        if (a == "1") {
            let b = await Contract.methods.LENGHT().call();
            count_(b[3]);
            number_(1);
            book_(await Contract.methods.Book(1).call());
        }
        if (a == "2")
            count_("");
    }

    async function Authorization() {
        if (login != "" || password != "") {
            pus_("false");
            try {
                let adr = await Contract.methods.Authorization(login).call();
                address_(adr[0]);
                await web3.eth.personal.unlockAccount(adr[0], password);
                web3.eth.defaultAccount = adr[0];
                let a = await web3.eth.getBalance(adr[0]);
                score_(a / 1000000000000000000);
                FIO_(adr[1]);
                city_(adr[3]);
                shop_(adr[4]);
                if (adr[2] == 1) {
                    role_("Administrator");
                    document.location.href = "http://localhost:3000/Page_3";
                }
                if (adr[2] == 2) {
                    role_("Seller");
                    document.location.href = "http://localhost:3000/Page_4";
                }
                if (adr[2] == 3) {
                    role_("Buyer");
                    document.location.href = "http://localhost:3000/Page_5";
                }
                if (adr[2] == 4) {
                    role_("Shop");
                    try {
                        rating_(await Contract.methods.Rating(adr[1]).call({ from: address }) / 100);
                    }
                    catch { rating_("NaN") }
                    document.location.href = "http://localhost:3000/Page_6";
                }
                if (adr[2] == 5) {
                    role_("Bank");
                    document.location.href = "http://localhost:3000/Page_7";
                }
                if (adr[2] == 6) {
                    role_("The supplier");
                    document.location.href = "http://localhost:3000/Page_8";
                }
                pus_("true");
            }
            catch {
                pus_("true");
                alert("Ошибка авторизации\nНеправильный логин или пароль!");
            }
        } else { alert("ОШИБКА, УБЕДИТЕСЬ В ТОМ, ЧТО ВСЕ ПОЛЯ ЗАПОЛНЕНЫ!"); }
    }

    async function KNIGA_ZHALOB(b) {
        if (b == "yes") {
            let a = number + 1;
            if (a <= count) {
                book_(await Contract.methods.Book(a).call());
                number_(a);
            }
        }
        if (b == "no") {
            let a = number - 1;
            if (a > 0) {
                book_(await Contract.methods.Book(a).call());
                number_(a);
            }
        }
    }

    return (
        <>
            <header className="navbar">
                <button className="text">HELP</button>&nbsp;
                <button className="text" onClick={() => setColor(!color)}>
                    THEME
                </button>
            </header><br />

            {pus == "true" && <div>
                <div className="message" style={{ float: "left", marginLeft: "40px" }}><br />
                    <center>
                        <div style={{ fontSize: "45px", fontWeight: "bolder" }}>LOGIN</div><br />

                        <input className="input" placeholder="LOGIN" type="text" value={login} onChange={(e) => logins(e.target.value)} /><br />

                        <input className="input" placeholder="PASSWORD" type="password" id="userPassword" value={password} onChange={(e) => passwords(e.target.value)} /><br /><br />
                        <button className="button" onClick={Authorization}>AUTHORIZATION</button>
                        <div style={{ color: "#333333" }}>
                            <label>______________NO_PROFILE______________</label>
                        </div>
                        <Link to="./Page_2"><button className="button">REGISTRATION</button></Link>
                    </center><br />
                </div>

                {count == "" && <div style={{ float: "left", marginLeft: "495px", fontSize: "45px", fontWeight: "bolder" }}><center>BOOK OF COMPLAINTS <button className="text_two" onClick={() => exit("1")}>&#9660;</button></center></div>}
                {count != "" && <div style={{ float: "left", marginLeft: "495px", fontSize: "45px", fontWeight: "bolder" }}><center>BOOK OF COMPLAINTS <button className="text_two" onClick={() => exit("2")}>&#9650;</button></center></div>}<br />
                {count != "" && <div>
                    <div style={{ float: "right", marginRight: "60px" }}><button className="text_two" onClick={() => exit("2")}>&#10006;</button></div><br />
                    <div style={{ float: "right", marginRight: "30px", fontSize: "10px", fontWeight: "bolder" }}>{number < count && (<button className="text_two" onClick={() => KNIGA_ZHALOB("yes")}>&#9650;</button>)}{number == count && (<button className="text_two4">&#9650;</button>
                    )}
                        <br /> {number > 1 && (<button className="text_two" onClick={() => KNIGA_ZHALOB("no")}>&#9660;</button>)}
                        {number == 1 && (<button className="text_two4">&#9660;</button>
                        )} </div>
                    <div style={{ float: "right", display: "flex", justifyContent: "center" }}>
                        <div className="message_three" style={{ marginRight: "1px", fontSize: "20px", fontWeight: "bolder" }}><center>Shop</center></div>
                        {book[2] != "" && book[1] == "" && <div className="message_three" style={{ marginRight: "1px", fontSize: "20px", fontWeight: "bolder" }}><center>Response to a comment</center></div>}
                        {book[1] != "" && book[2] == "" && <div className="message_three" style={{ marginRight: "1px", fontSize: "20px", fontWeight: "bolder" }}><center>Top-level comment</center></div>}
                        {book == "" && <div className="message_three" style={{ float: "right", marginRight: "1px", fontSize: "20px", fontWeight: "bolder" }}><center>Comment/Response</center></div>}
                        <div className="message_three" style={{ marginRight: "1px", fontSize: "20px", fontWeight: "bolder" }}><center>Who left a comment</center></div>
                        <div className="message_three" style={{ marginRight: "1px", fontSize: "20px", fontWeight: "bolder" }}><center>Rating (on a 10-point basis)</center></div>
                        <div className="message_three" style={{ marginRight: "1px", fontSize: "20px", fontWeight: "bolder" }}><center>Amount of "+"</center></div>
                        <div className="message_three" style={{ marginRight: "30px", fontSize: "20px", fontWeight: "bolder" }}><center>Amount of "-"</center></div> <br /><br />
                    </div>
                    {number != 0 && <div style={{ float: "right", display: "flex", justifyContent: "center" }}>
                        <div className="message_six" style={{ marginRight: "10px", fontSize: "20px", fontWeight: "bolder" }}><div style={{ float: "right" }}>{number}</div></div>
                        <div className="message_foo" style={{ float: "right", marginRight: "1px", fontSize: "20px" }}><center>{book[0]}</center></div>
                        {book[1] != "" && book[2] == "" && <div className="message_foo" style={{ marginRight: "1px", fontSize: "20px" }}><center>{book[1]}</center></div>}
                        {book[2] != "" && book[1] == "" && <div className="message_foo" style={{ marginRight: "1px", fontSize: "20px" }}><center>{book[2]}</center></div>}
                        <div className="message_foo" style={{ marginRight: "1px", fontSize: "20px", justifyContent: "center" }}><center>{book[3]}</center></div>
                        <div className="message_foo" style={{ marginRight: "1px", fontSize: "20px" }}><center>{book[4]}</center></div>
                        <div className="message_foo" style={{ marginRight: "1px", fontSize: "20px" }}><center>{book[5]}</center></div>
                        <div className="message_foo" style={{ marginRight: "97px", fontSize: "20px" }}><center>{book[6]}</center></div>
                    </div>}
                    <div className="message_five" style={{ float: "right", marginRight: "97px", fontSize: "20px" }}>&emsp;Total: {count}</div>
                </div>}</div>}
            {pus == "false" && <div><center><br /><br /><br /><br /><br /><br /><img src={pusk} width="400" alt="" /></center></div>}
        </>);
};
export default Page_1;