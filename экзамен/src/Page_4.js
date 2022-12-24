import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { UseColorContext, UseContext } from "./Contract/Context";
import pusk from './pusk.gif'

const Page_4 = () => {
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
    const shop = sessionStorage.getItem("shop");
    const [mas, mass] = useState(["ACTIONS", "REQUESTS", "BOOK OF COMPLAINTS", "THEME"]);
    const [req, req_] = useState(0);
    const [count, count_] = useState("");
    const [count2, count2_] = useState("");
    const [count3, count3_] = useState("");
    const [number, number_] = useState(0);
    const [number2, number2_] = useState(0);
    const [number3, number3_] = useState(0);
    const [book, book_] = useState("");
    const [my_book, my_book_] = useState("");
    const [dei, dei_] = useState("");
    const [mess, mess_] = useState("");
    const [messe, messe_] = useState("");
    const [time, time_] = useState("");
    const [hours, hours_] = useState("");
    const [comment, comment_] = useState("");
    const [ball, ball_] = useState(0);
    const [com, com_] = useState("");
    const [my_comm, my_comm_] = useState("");
    const [trans, trans_] = useState("");
    const [click, click_] = useState("");
    const [click2, click2_] = useState("");
    const [click3, click3_] = useState("");
    const [click4, click4_] = useState("");
    sessionStorage.setItem("address", address);
    sessionStorage.setItem("password", password);
    sessionStorage.setItem("login", login);
    sessionStorage.setItem("score", score);
    sessionStorage.setItem("FIO", FIO);
    sessionStorage.setItem("role", role);
    sessionStorage.setItem("city", city);

    //setInterval(() => web3.eth.personal.unlockAccount(address, password), 30000);

    async function list(e) {
        if (e.target.value == "COMPLAINT BOOK") {
            let b = await Contract.methods.LENGHT().call({ from: address });
            count_(b[3]);
            number_(1);
            book_(await Contract.methods.Book(1).call());
        }

        if (e.target.value == "ACTIONS") {
            let a = await Contract.methods.LENGHT().call({ from: address });;
            for (var i = 0; i < a[1]; i++) {
                let m = await Contract.methods.Viewing_MESSAGES(i).call()
                if (m[0] == FIO && m[3] == 1)
                    req_(1);
            }
            dei_("ACTIONS");
        }

        if (e.target.value == "REQUESTS") {
            messe_("REQUESTS");
            try {
                let b = await Contract.methods.Viewing_purchase(shop, 0).call()
                count2_(b[4]);
                if (b[4] != 0) {
                    number2_(1);
                    let m = await Contract.methods.Viewing_purchase(shop, 0).call()
                    mess_(m);
                    var d = new Date(m[2] * 1000),
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
            catch (e) {
                count2_(0);
            }
        }

        if (e.target.value == "THEME") {
            setColor(!w);
            w_(!w);
        }
        e.target.value = "";
    }

    async function exit(a) {
        click3_(a);
        if (a == "count") {
            count_("");
            ball_(0);
            comment_("");
            com_("");
        }
        if (a == "dei") {
            dei_("");
            my_comm_("");
            trans_("");
            req_(0);
        }
        if (a == "messe") {
            click4_("");
            messe_("");}
        if (a == "COMMENT") {
            ball_(0);
            comment_("");
            if (com != "COMMENT")
                com_("COMMENT");
            else
                com_("");
        }
        if (a == "Comment_not") {
            ball_(0);
            comment_("");
            com_("");
        }
        if (a == "my_comm") {
            trans_("");
            my_comm_("my_comm");
            let b = await Contract.methods.LENGHT().call({ from: address });
            count3_(b[2]);
            if (b[2] != 0) {
                number3_(1);
                my_book_(await Contract.methods.My_coments(1).call({ from: address }));
            }
        }

        if (a == "reg") {
            my_comm_("");
            trans_("reg");
        }
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

    async function My_coments(b) {
        if (b == "yes") {
            let a = number3 + 1;
            if (a <= count3) {
                my_book_(await Contract.methods.My_coments(a).call({ from: address }));
                number3_(a);
            }
        }
        if (b == "no") {
            let a = number3 - 1;
            if (a > 0) {
                my_book_(await Contract.methods.My_coments(a).call({ from: address }));
                number3_(a);
            }
        }
    }

    async function Viewing_MESSAGES(b) {
        if (b == "+") {
            var n = number2;
            if ((number2 + 1) <= count2) {
                number2_(number2 + 1);
                let m = await Contract.methods.Viewing_purchase(shop, n).call()
                mess_(m);
                var d = new Date(m[2] * 1000),
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
            console.log(a)
            if (a > 0) {
                number2_(a);
                a--;
                let m = await Contract.methods.Viewing_purchase(shop, a).call()
                mess_(m);
                var d = new Date(m[2] * 1000),
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

    async function Comments_book(a) {
        click2_(a);
        try {
            await Contract.methods.Comments_book(number, a).send({ from: address });
            book_(await Contract.methods.Book(number).call());
        }
        catch {
            alert("The error can serve as:\n1. You have already evaluated this entry \n2. You can't evaluate your record");
        }
        click2_("");
    }

    async function Comments() {
        click_("1");
        if (ball != 0) {
            let a = await Contract.methods.Book(number).call();
            if (comment != "")
                await Contract.methods.Book_zhalob(a[0], "", comment, ball).send({ from: address });
            else
                await Contract.methods.Book_zhalob(a[0], "", "-", ball).send({ from: address });
            let b = await Contract.methods.LENGHT().call({ from: address });
            count_(b[3]);
            count3_(b[2]);
        }
        else { alert("ERROR, MAKE SURE THAT ALL THE FIELDS ARE FILLED IN!"); }
        click_("");
    }

    async function Request(a) {
        try {
            trans_("prog");
            await Contract.methods.Request(a).send({ from: address });
            count2_(0);
        }
        catch { alert("The request was sent earlier, wait for a response"); } trans_(""); req_(1);
    }

    async function Answer_purchase() {
        click4_(1);
        try {
            let a = number2--;
            await Contract.methods.Answer_purchase(shop, number2).send({ from: address });
            let m = await Contract.methods.Viewing_purchase(shop, number2).call()
            mess_(m);
            click4_("");
        }
        catch(e){click4_("");alert("Error")}
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
                <div className="message_two5" style={{ marginLeft: "40px" }}>
                    <div style={{ float: "right", marginRight: "20px" }}><Link to="./Page_5"><button className="text_three">BUYER</button></Link></div><br /><br />
                    <div style={{ fontSize: "45px", fontWeight: "bolder" }}><center>SELLER'S PERSONAL PAGE</center></div><br />
                    &nbsp;Full name:&nbsp;{FIO}<br />
                    &nbsp;Login:&nbsp;{login}<br />
                    &nbsp;City:&nbsp;{city}<br />
                    &nbsp;Shop:&nbsp;{shop}<br />
                    &nbsp;Current balance:&nbsp;{Math.round(parseFloat(score) * 100) / 100}<br /><br />
                </div><br />

                {count != "" && <div>
                    <div className="message_five_2" style={{ fontSize: "20px", fontWeight: "bolder", marginLeft: "70px" }}>
                        &emsp;Total: {count}
                        <div style={{ float: "right", marginRight: "20px" }}>
                            <button className="text_two" onClick={() => exit("count")}>&#10006;</button>
                        </div><br /><br />
                    </div>
                    <div style={{ display: "flex", marginLeft: "70px" }}>
                        <div className="message_three" style={{ display: "inline-block", fontSize: "20px", fontWeight: "bolder" }}><center>Shop</center></div>
                        {book[2] != "" && book[1] == "" && <div className="message_three" style={{ display: "inline-block", marginLeft: "1px", fontSize: "20px", fontWeight: "bolder" }}><center>Response to a comment</center></div>}
                        {book[1] != "" && book[2] == "" && <div className="message_three" style={{ display: "inline-block", marginLeft: "1px", fontSize: "20px", fontWeight: "bolder" }}><center>Top-level comment</center></div>}
                        {book == "" && <div className="message_three" style={{ display: "inline-block", float: "right", marginLeft: "1px", fontSize: "20px", fontWeight: "bolder" }}><center>Comment / Response</center></div>}
                        <div className="message_three" style={{ display: "inline-block", marginLeft: "1px", fontSize: "20px", fontWeight: "bolder" }}><center>Who left a comment</center></div>
                        <div className="message_three" style={{ display: "inline-block", marginLeft: "1px", fontSize: "20px", fontWeight: "bolder" }}><center>Rating (on a 10-point basis)</center></div>
                        <div style={{ float: "right", marginRight: "30px", fontSize: "10px", fontWeight: "bolder" }}>{number < count && (<button className="text_two" onClick={() => KNIGA_ZHALOB("yes")}>&#9650;</button>)}{number == count && (<button className="text_two4">&#9650;</button>
                        )}
                            <br /> {number > 1 && (<button className="text_two" onClick={() => KNIGA_ZHALOB("no")}>&#9660;</button>)}
                            {number == 1 && (<button className="text_two4">&#9660;</button>
                            )} </div>
                    </div>
                    {number != 0 && <div style={{ display: "inline-block", display: "flex" }}>
                        <div className="message_six" style={{ fontSize: "20px", fontWeight: "bolder" }}><div style={{ float: "right" }}>{number}</div></div>
                        <div className="message_foo" style={{ marginLeft: "10px", fontSize: "20px" }}><center>{book[0]}</center></div>
                        {book[1] != "" && book[2] == "" && <div className="message_foo" style={{ marginLeft: "1px", fontSize: "20px" }}><center>{book[1]}</center></div>}
                        {book[2] != "" && book[1] == "" && <div className="message_foo" style={{ marginLeft: "1px", fontSize: "20px" }}><center>{book[2]}</center></div>}
                        <div className="message_foo" style={{ marginLeft: "1px", fontSize: "20px", justifyContent: "center" }}><center>{book[3]}</center></div>
                        <div className="message_foo" style={{ marginLeft: "1px", fontSize: "20px" }}><center>{book[4]}</center></div>
                    </div>}
                    <div className="message_five_2" style={{ display: "flex", justifyContent: "center", marginLeft: "70px" }}>
                        <button className="button3_2" onClick={() => exit("COMMENT")}>COMMENT</button>
                        {click2 != "like" && <button className="btn" onClick={() => Comments_book("like")}>+ <br /> {book[5]}</button>}
                        {click2 == "like" && <button className="btns" >+ <br /> {book[5]}</button>}
                        {click2 != "dislike" && <button className="btn" onClick={() => Comments_book("dislike")}>- <br /> {book[6]}</button>}
                        {click2 == "dislike" && <button className="btns">- <br /> {book[6]}</button>}</div>

                    {com == "COMMENT" && com != "" && <div className="message_five_3" style={{ marginLeft: "70px" }}>
                        <div style={{ float: "right", marginRight: "20px" }}>
                            <button className="text_two" onClick={() => exit("Comment_not")}>&#10006;</button>
                        </div >
                        <div style={{ marginLeft: "20px" }}>
                            ESTIMATION<br />
                            <input className="input2" type="range" min="1" max="10" step="1" value={ball} onChange={(e) => ball_(e.target.value)} />
                            {ball} &#9733; <br /><br />
                            &nbsp;<textarea className="input3" placeholder="comment" value={comment} onChange={(e) => comment_(e.target.value)} />
                        </div>
                        <center>{click == "" && <button className="button" onClick={Comments}>POST A COMMENT</button>}
                            {click == "1" && <button className="buttonf">POST A COMMENT</button>}</center>
                    </div>}
                </div>}
                <br /><br /><br />
            </div>

            <div style={{ float: "right" }}>
                {dei == "ACTIONS" && <div className="mes_but" style={{ marginRight: "40px" }}>
                    <button style={{ float: "right", marginRight: "20px" }} className="text_two" onClick={() => exit("dei")}>&#10006;</button>
                    <div style={{ float: "right" }}><br />
                        {req == 0 && click3 != "reg" && <button className="button2" onClick={() => exit("reg")}>CHANGE ROLES</button>}
                        {req == 0 && click3 == "reg" && <button className="buttone" >CHANGE ROLES</button>}
                        {req == 0 && <br />}
                        {click3 != "my_comm" && <button className="button2" onClick={() => exit("my_comm")}>MY COMMENTS</button>}
                        {click3 == "my_comm" && <button className="buttone" >MY COMMENTS</button>}
                    </div>
                    {my_comm != "" && <div>
                        <div className="message_five_2" style={{ fontSize: "20px", fontWeight: "bolder", marginLeft: "70px", backgroundColor: "#00000000" }}>
                            &emsp;Total: {count3}
                            <div style={{ float: "right", marginRight: "20px" }}>
                            </div><br />
                        </div>
                        {count3 != 0 && <div>
                            <div style={{ display: "flex", marginLeft: "70px" }}>
                                <div className="message_three" style={{ display: "inline-block", fontSize: "20px", fontWeight: "bolder", backgroundColor: "#00000000" }}><center>Shop</center></div>
                                <div className="message_three" style={{ display: "inline-block", marginLeft: "1px", fontSize: "20px", fontWeight: "bolder", backgroundColor: "#00000000" }}><center>Response to a comment</center></div>
                                <div className="message_three" style={{ display: "inline-block", marginLeft: "1px", fontSize: "20px", fontWeight: "bolder", backgroundColor: "#00000000" }}><center>Rating (on a 10-point basis)</center></div>
                                <div style={{ display: "inline-block", fontSize: "10px", fontWeight: "bolder" }}>{number3 < count3 && (<button className="text_two" onClick={() => My_coments("yes")}>&#9650;</button>)}{number3 == count3 && (<button className="text_two4">&#9650;</button>
                                )}
                                    <br /> {number3 > 1 && (<button className="text_two" onClick={() => My_coments("no")}>&#9660;</button>)}
                                    {number3 == 1 && (<button className="text_two4">&#9660;</button>
                                    )}
                                    {count3 == 0 && (<button className="text_two4">&#9660;</button>
                                    )} </div>
                            </div>
                            {number3 != 0 && <div style={{ display: "inline-block", display: "flex" }}>
                                <div className="message_six" style={{ fontSize: "20px", fontWeight: "bolder" }}><div style={{ float: "right" }}>{number3}</div></div>
                                <div className="message_foo" style={{ marginLeft: "10px", fontSize: "20px" }}><center>{my_book[0]}</center></div>
                                <div className="message_foo" style={{ marginLeft: "1px", fontSize: "20px", justifyContent: "center" }}><center>{my_book[1]}</center></div>
                                <div className="message_foo" style={{ marginLeft: "1px", fontSize: "20px" }}><center>{my_book[2]}</center></div>
                            </div>}
                            &emsp; &emsp;+ {my_book[3]}
                            &emsp;  - {my_book[4]}
                        </div>}
                        {count3 == 0 && <div><br /><br /><br /><br /><br /><br /></div>}
                    </div>}
                    {trans == "reg" && my_comm == "" && <div style={{ marginLeft: "20px" }}><br />
                        {role != "Administrator" && req == 0 && <button className="button2" onClick={() => Request(1)}>promotion</button>}<br />
                        {role != "Buyer" && req == 0 && <button className="button2" onClick={() => Request(2)}>demotion of the role</button>}
                        <br /><br /><br /><br /></div>}
                    {trans == "prog" && <div style={{ float: "left", marginLeft: "200px" }}><center><br /><br /><br /><img src={pusk} width="200" alt="" /></center></div>}
                    {my_comm == "" && trans == "" && <div><br /><br /><br /><br /><br /><br /></div>}
                    {trans == "prog" && <div><br /><br /><br /><br /><br /><br /></div>}
                </div>}
                {dei == "ACTIONS" && <div><br /></div>}

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
                        <div className="message_two2">
                            <div style={{ float: "right", marginRight: "20px" }}><button className="text_two" onClick={() => exit("messe")}>&#10006;</button></div>
                            {count2 != 0 && <div style={{ backgroundColor: "#ffffff" }}>
                                &nbsp;Full name:&nbsp;{mess[1]}<br />
                                &nbsp;{mess[0]}<br />
                                {mess[3] == 1 && <div style={{ color: "#B22222" }}> &nbsp;Waiting for a response<br /></div>}
                                {mess[3] == 2 && <div style={{ color: "#32CD32" }}> &nbsp;The response has been sent<br /></div>}
                                &nbsp;Cost:&nbsp;{mess[5]}<br />
                                &nbsp;{time}<br />
                                &nbsp;{hours}<br /></div>}
                            &emsp;Total: {count2}
                            {mess[3] == 1 &&<br />}
                            <center>{click4 != 1 && mess[3] == 1 &&<button className="text" onClick={Answer_purchase}>CONFIRM</button>}
                            {click4 == 1 && mess[3] == 1 &&<button className="textf">CONFIRM</button>}</center></div></div>
                </div>}
            </div>

        </>
    );
};
export default Page_4;