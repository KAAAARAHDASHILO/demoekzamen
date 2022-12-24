import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { UseColorContext, UseContext } from "./Contract/Context";
import pusk from './pusk.gif'

const Page_2 = () => {
    const { color, setColor } = UseColorContext();
    const { web3, Contract } = UseContext();
    const [last_name, last_names] = useState("");
    const [name, names] = useState("");
    const [patronymic, patronymics] = useState("");
    const [password, passwords] = useState("");
    const [password2, passwords2] = useState("");
    const [login, logins] = useState("");
    const [count, count_] = useState("");
    const [number, number_] = useState("");
    const [book, book_] = useState("");
    const [pus, pus_] = useState("true");
    setColor("red");

    async function Registration() {
        if (last_name != "" && name != "" && patronymic != "" && login != "" && password != "" && password2 != "") {
            pus_("false");
            try {
                let FIO = last_name + " " + name + " " + patronymic;
                if (password2 == password) {
                    let addr = await web3.eth.personal.newAccount(password);
                    await web3.eth.personal.unlockAccount("0x732aA77cB86481f942073f7690065ef7A5c95275", "0000");
                    await web3.eth.sendTransaction({ from: "0x732aA77cB86481f942073f7690065ef7A5c95275", to: addr, value: "100000000000000000000" });
                    await web3.eth.personal.unlockAccount(addr, password);
                    await Contract.methods.Registration(FIO, login).send({ from: addr });
                    document.location.href = "http://localhost:3000/Page_1";
                    pus_("true");
                }
                else {
                    pus_("true");
                    alert("ОШИБКА, ПАРОЛЬ НЕ СОВПАДАЕТ!");
                }
            }
            catch {
                pus_("true");
                alert("Ошибкой может послужить: \n 1. Этот логин уже используется.")
            }
        } else { alert("ОШИБКА, УБЕДИТЕСЬ В ТОМ, ЧТО ВСЕ ПОЛЯ ЗАПОЛНЕНЫ!") }
    }

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
            <header className="navbar_three"><Link to="./Page_1"><button className="text">BACK</button></Link></header><br />

            {pus == "true" && <div>
                <div className="message" style={{ float: "left", marginLeft: "40px", display: "flex", justifyContent: "center" }}>
                    <p>
                        <div style={{ fontSize: "45px", fontWeight: "bolder" }}><center>REGISTRATION</center></div><br />
                        &nbsp;<input className="input" placeholder="SURNAME" type="text" value={last_name} onChange={(e) => last_names(e.target.value)} /><br /><br />
                        &nbsp;<input className="input" placeholder="NAME" type="text" value={name} onChange={(e) => names(e.target.value)} /><br /><br />
                        &nbsp;<input className="input" placeholder="PATRONYMIC" type="text" value={patronymic} onChange={(e) => patronymics(e.target.value)} /><br /><br />
                        &nbsp;<input className="input" placeholder="LOGIN" type="text" value={login} onChange={(e) => logins(e.target.value)} /><br /><br />
                        &nbsp;<input className="input" placeholder="PASSWORD" type="text" type="password" id="userPassword" value={password} onChange={(e) => passwords(e.target.value)} /><br /><br />
                        &nbsp;<input className="input" placeholder="CONFIRM PASSWORD" type="password" id="userPassword" value={password2} onChange={(e) => passwords2(e.target.value)} /><br /><br />
                        <center><button className="button" onClick={Registration}>REGISTER</button></center>
                    </p>
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
                        {book == "" && <div className="message_three" style={{ float: "right", marginRight: "1px", fontSize: "20px", fontWeight: "bolder" }}><center>Comment / Response</center></div>}
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

            {pus == "false" && <div><center><br /><br /><br /><br /><br /><img src={pusk} width="400" alt="" /></center></div>}
        </>
    );
};
export default Page_2;