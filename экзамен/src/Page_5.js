import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { UseColorContext, UseContext } from "./Contract/Context";
import lupa from './lupa.svg'
import pusk from './pusk.gif'

const Page_5 = () => {
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
    const [mas, mass] = useState(["ACTIONS", "BOOK OF COMPLAINTS", "THEME"]);
    const [count, count_] = useState("");
    const [count2, count2_] = useState("");
    const [count3, count3_] = useState("");
    const [number, number_] = useState(0);
    const [number2, number2_] = useState(0);
    const [number3, number3_] = useState(0);
    const [book, book_] = useState("");
    const [my_book, my_book_] = useState("");
    const [rating, rating_] = useState("");
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
    const [name, name_] = useState([]);
    const [name_mags, name_mags_] = useState([]);
    const [mags, mags_] = useState([]);
    const [mag, mag_] = useState("");
    const [PURCHASES, PURCHASES_] = useState("");
    const [time5, time5_] = useState("");
    const [hours5, hours5_] = useState("");
    const [time6, time6_] = useState("");
    const [hours6, hours6_] = useState("");
    const [shop_name_prod, shop_name_prod_] = useState([]);
    const [sums, sums_] = useState("");
    const [index, index_] = useState("");
    const [click, click_] = useState("");
    const [click2, click2_] = useState("");
    const [click3, click3_] = useState("");
    const [click4, click4_] = useState("");
    const [req, req_] = useState(0);

    //setInterval(() => web3.eth.personal.unlockAccount(address, password), 30000);

    async function list(e) {
        if (e.target.value == "COMPLAINT BOOK") {
            let b = await Contract.methods.LENGHT().call({ from: address });
            count_(b[3]);
            number_(1);
            book_(await Contract.methods.Book(1).call());
        }

        if (e.target.value == "ACTIONS") {
            let a = await Contract.methods.LENGHT().call();;
            for (var i = 0; i < a[1]; i++) {
                let m = await Contract.methods.Viewing_MESSAGES(i).call()
                if (m[0] == FIO && m[3] == 1)
                    req_(1);
            }
            dei_("ACTIONS");
        }

        if (e.target.value == "THEME") {
            setColor(!w);
            w_(!w);
        }
        e.target.value = "";
    }

    async function exit(a) {
        click_(a);
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
            mags_("");
            sums_("");
            time5_("");
            time6_("");
            hours6_("");
            click3_("");
            req_(0);
            hours5_("");
            PURCHASES_("");
            shop_name_prod_("");
        }

        if (a == "messe")
            messe_("");

        if (a == "COMMENT") {
            ball_(0);
            comment_("");
            mag_("");
            click3_(a);
            if (com_ != "COMMENT")
                com_("COMMENT");
            else
                com_("");
        }

        if (a == "LEAVE A REVIEW") {
            ball_(0);
            comment_("");
            click3_(a);
            let c = await Contract.methods.LENGHT_SHOP().call();
            let p = [];
            let g = 0;
            for (let i = 0; i < c[0]; i++) {
                let b = await Contract.methods.Viewing_SHOP(i).call()
                if (b != "Data deleted") {
                    p[g] = b;
                    g++;
                }
            }
            name_(p);
            com_("LEAVE A REVIEW");
        }

        if (a == "Comment_not") {
            ball_(0);
            comment_("");
            com_("");
            mag_("");
            click3_("");

        }

        if (a == "my_comm") {
            trans_("");
            mags_("");
            time5_("");
            time6_("");
            hours6_("");
            sums_("");
            hours5_("");
            PURCHASES_("");
            my_comm_("my_comm");
            shop_name_prod_("");
            let b = await Contract.methods.LENGHT().call({ from: address });
            count3_(b[2]);
            if (b[2] != 0) {
                number3_(1);
                my_book_(await Contract.methods.My_coments(1).call({ from: address }));
            }
        }

        if (a == "reg") {
            my_comm_("");
            PURCHASES_("");
            trans_("reg");
            mags_("");
            time5_("");
            time6_("");
            hours6_("");
            sums_("");
            hours5_("");
            shop_name_prod_("");
        }

        if (a == "PURCHASES") {
            trans_("");
            my_comm_("");
            PURCHASES_("PURCHASES");
            let c = await Contract.methods.LENGHT_SHOP().call();
            let p = [];
            let d = 0;
            for (let i = 0; i < c[0]; i++) {
                let b = await Contract.methods.Viewing_SHOP(i).call()
                if (b != "Data deleted") {
                    p[d] = b;
                    d++;
                }
            }
            name_mags_(p);
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

    async function Comments_book(a) {
        click4_(a)
        try {
            await Contract.methods.Comments_book(number, a).send({ from: address });
            book_(await Contract.methods.Book(number).call());
        }
        catch {
            alert("The error can serve as:\n1. You have already evaluated this entry \n2. You can't evaluate your record")
        }
        click4_("");
    }

    async function Comments(w) {
        click2_(w);
        if (w == "one") {
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
        }
        if (w == "two") {
            if (ball != 0 && mag != "") {
                let a = await Contract.methods.Book(number).call();
                if (comment == "")
                    await Contract.methods.Book_zhalob(mag, "-", "", ball).send({ from: address });
                else
                    await Contract.methods.Book_zhalob(mag, comment, "", ball).send({ from: address });
                let b = await Contract.methods.LENGHT().call({ from: address });
                count_(b[3]);
                count3_(b[2]);
            }
            else { alert("ERROR, MAKE SURE THAT ALL THE FIELDS ARE FILLED IN!"); }
        }
        click2_("");
    }

    async function lit(e) {
        mag_(e.target.value);
    }

    async function lit2(e) {
        time5_("");
        time6_("");
        hours6_("");
        hours5_("");
        sums_("");
        shop_name_prod_("");
        mags_(e.target.value);
        try {
            rating_(await Contract.methods.Rating(e.target.value).call() / 100);
        }
        catch { rating_("NaN") }
        let a = await Contract.methods.Shops(e.target.value).call();
        let c = await Contract.methods.LENGHT_SHOP().call({ from: a[6] });
        let p = [];
        let d = 0;
        for (var i = 0; i < c[5]; i++) {
            let b = await Contract.methods.Viewing_PRODUCT_SHOP(e.target.value, i).call({ from: a[6] });
            if (b[0] != "Data deleted") {
                p[d] = b[0];
                d++;
            }
        }
        shop_name_prod_(p);
    }

    async function lit3(e) {
        let a = await Contract.methods.Shops(mags).call();
        let v = await Contract.methods.LENGHT_SHOP().call({ from: a[6] });
        for (var i = 0; i <= v[5]; i++) {
            let b = await Contract.methods.Viewing_PRODUCT_SHOP(mags, i).call({ from: a[6] });
            if (e.target.value == b[0]) {
                let b = await Contract.methods.Viewing_PRODUCT_SHOP(mags, i++).call()
                index_(i - 1);
                mag_(b);
                var d = new Date(b[1] * 1000),
                    yyyy = d.getFullYear(),
                    mm = ("0" + (d.getMonth() + 1)).slice(-2),
                    dd = ("0" + d.getDate()).slice(-2),
                    hh = d.getHours(),
                    h = hh,
                    min = ("0" + d.getMinutes()).slice(-2);
                hours5_(h + ":" + min);
                time5_(dd + "." + mm + "." + yyyy + " г.");

                var d = new Date(b[2] * 1000),
                    yyyy = d.getFullYear(),
                    mm = ("0" + (d.getMonth() + 1)).slice(-2),
                    dd = ("0" + d.getDate()).slice(-2),
                    hh = d.getHours(),
                    h = hh,
                    min = ("0" + d.getMinutes()).slice(-2);
                hours6_(h + ":" + min);
                time6_(dd + "." + mm + "." + yyyy + " г.");
            }
        }
    }

    async function Request(a) {
        try {
            trans_("prog");
            await Contract.methods.Request(a).send({ from: address });
            req_(1);
        }
        catch { alert("The request was sent earlier, wait for a response"); }
        trans_("");
    }

    async function Request_purchase() {
        trans_("prog");
        let text
        if (mag[3] == 1)
            text = "Purchase Request " + sums + " pieces " + mag[0];
        else
            text = "Purchase Request " + sums + " kg " + mag[0];
            console.log(sums)
        await Contract.methods.Request_purchase(mags, text, index, sums).send({ from: address });
        trans_("");my_comm_(""); PURCHASES_(""); click_("");
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
                    {role != "Buyer" && <div>{role == "Seller" && <div style={{ float: "right", marginRight: "20px" }}><Link to="./Page_4"><button className="text_three">SELLER</button></Link></div>}
                        {role == "Administrator" && <div style={{ float: "right", marginRight: "20px" }}><Link to="./Page_3"><button className="text_three">ADMINISTRATOR</button></Link></div>}<br /></div>}<br />
                    <div style={{ fontSize: "45px", fontWeight: "bolder" }}><center>BUYER'S PERSONAL PAGE</center></div><br />
                    &nbsp;Full name:&nbsp;{FIO} <br />
                    &nbsp;Login:&nbsp;{login} <br />
                    &nbsp;Current balance:&nbsp;{Math.round(parseFloat(score) * 100) / 100} <br /><br />
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
                    <div className="message_five_2" style={{ justifyContent: "center", marginLeft: "70px", backgroundColor: "#6b65829c" }}>
                        <div style={{ float: "right", marginRight: "20px" }}>{click4 != "like" && <button className="text" onClick={() => Comments_book("like")}>+ <br /> {book[5]}</button>}
                            {click4 == "like" && <button className="textf" >+ <br /> {book[5]}</button>}
                            {click4 != "dislike" && <button className="text" onClick={() => Comments_book("dislike")}>- <br /> {book[6]}</button>}
                            {click4 == "dislike" && <button className="textf">- <br /> {book[6]}</button>}<br /></div>
                        <div style={{ marginLeft: "20px" }}>{click3 != "COMMENT" && <button className="text" onClick={() => exit("COMMENT")}>&nbsp;&nbsp;COMMENT</button>}
                            {click3 == "COMMENT" && <button className="textf" >&nbsp;&nbsp;COMMENT</button>}
                            {click3 != "LEAVE A REVIEW" && <button className="text" onClick={() => exit("LEAVE A REVIEW")}>LEAVE FEEDBACK</button>}
                            {click3 == "LEAVE A REVIEW" && <button className="textf">LEAVE FEEDBACK</button>}</div>
                    </div>

                    {com == "COMMENT" && <div className="message_five_3" style={{ marginLeft: "70px" }}>
                        <div style={{ float: "right", marginRight: "20px" }}>
                            <button className="text_two" onClick={() => exit("Comment_not")}>&#10006;</button>
                        </div >
                        <div style={{ marginLeft: "20px" }}>
                            ESTIMATION<br />
                            <input className="input2" type="range" min="1" max="10" step="1" value={ball} onChange={(e) => ball_(e.target.value)} />
                            {ball} &#9733; <br /><br />
                            &nbsp;<textarea className="input3" placeholder="comment" value={comment} onChange={(e) => comment_(e.target.value)} />
                        </div>
                        <center>{click2 != "one" && <button className="button" onClick={() => Comments("one")}>POST A COMMENT</button>}
                            {click2 == "one" && <button className="buttonf" onClick={() => Comments("one")}>POST A COMMENT</button>}</center>
                    </div>}

                    {com == "LEAVE A REVIEW" && <div className="message_five_3" style={{ marginLeft: "70px" }}>
                        <div style={{ float: "right", marginRight: "20px" }}>
                            <button className="text_two" onClick={() => exit("Comment_not")}>&#10006;</button>
                        </div >
                        <div style={{ marginLeft: "20px" }}>
                            <select className="text_two2" onChange={lit}>
                                <option value='' hidden>SHOP</option>
                                {name.map((arr, i) => <option key={i} value={String(arr)}>
                                    {arr}
                                </option>)}</select><br /><br />
                            ESTIMATION<br />
                            <input className="input2" type="range" min="1" max="10" step="1" value={ball} onChange={(e) => ball_(e.target.value)} />
                            {ball} &#9733; <br /><br />
                            &nbsp;<textarea className="input3" placeholder="comment" value={comment} onChange={(e) => comment_(e.target.value)} />
                        </div>
                        <center>{click2 != "two" && <button className="button" onClick={() => Comments("two")}>POST FEEDBACK</button>}
                            {click2 == "two" && <button className="buttonf" >POST FEEDBACK</button>}</center>
                    </div>}
                </div>}
                <br /><br /><br />
            </div>

            <div style={{ float: "right" }}>
                {dei == "ACTIONS" && <div className="mes_but" style={{ marginRight: "40px" }}>
                    <button style={{ float: "right", marginRight: "20px" }} className="text_two" onClick={() => exit("dei")}>&#10006;</button>
                    <div style={{ float: "right" }}>
                        <br />
                        {req == 0 && click != "reg" && <button className="button2" onClick={() => exit("reg")}>CHANGE ROLES</button>}
                        {req == 0 && click == "reg" && <button className="buttone" >CHANGE ROLES</button>}
                        {req == 0 && <br />}
                        {click != "my_comm" && <button className="button2" onClick={() => exit("my_comm")}>MY COMMENTS</button>}
                        {click == "my_comm" && <button className="buttone">MY COMMENTS</button>}<br />
                        {click != "PURCHASES" && <button className="button2" onClick={() => exit("PURCHASES")}>PURCHASES</button>}
                        {click == "PURCHASES" && <button className="buttone">PURCHASES</button>}
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
                    {PURCHASES == "PURCHASES" && trans != "prog" && <div style={{ marginLeft: "20px" }}>
                        <br />
                        &nbsp;<select className="text_two2" onChange={lit2}>
                            <option value='' hidden>STORE NAME</option>
                            {name_mags.map((arr, i) => <option key={i} value={String(arr)}>
                                {arr}
                            </option>)}</select><br />
                        {mags != "" && rating != "NaN" && <div>&nbsp;Rating:&nbsp;{Math.round(parseFloat(rating) * 100) / 100}<br /></div>}<br />
                        {shop_name_prod != "" && <div ><select className="text_two2" onChange={lit3}>
                            <option value='' hidden>PRODUCT NAME</option>
                            {shop_name_prod.map((arr, i) => <option key={i} value={String(arr)}>
                                {arr}
                            </option>)}</select><br />
                            {time5 != "" && <div>&nbsp;End date:<br />
                                <div style={{ color: "#544F4F" }}>&nbsp; &nbsp;{time5} {hours5}<br />
                                    &nbsp; &nbsp;{time6} {hours6}<br />
                                </div>
                                {mag[3] == 2 && <div>&nbsp;Price:&nbsp;{mag[5]} for 1 piece<br /></div>}
                                {mag[3] == 1 && <div>&nbsp;Price:&nbsp;{mag[5]} for 1 kg<br /></div>}
                                &nbsp;Quantity in stock:&nbsp;{mag[4]}<br />

                                {mag[3] == 2 && <div>&nbsp;<input className="input" type="number" min="1" max={mag[4]} step="1" placeholder="&emsp;PIECES" value={sums} onChange={(e) => sums_(e.target.value)} /><br /></div>}
                                {mag[3] == 1 && <div>&nbsp;<input className="input" type="number" min="1" max={mag[4]} step="1" placeholder="&emsp;KG" value={sums} onChange={(e) => sums_(e.target.value)} /><br /></div>}
                                {mag[3] == 1 && sums != "" && <div>&nbsp;Quantity: {sums} kg</div>}
                                {mag[3] == 2 && sums != "" && <div>&nbsp;Quantity: {sums} pieces</div>}
                                {sums != "" && <div>&nbsp;Total amount: {mag[5] * sums}<br />
                                    &nbsp;<button className="button3" onClick={Request_purchase}>I'M BUYING</button></div>}<br /></div>}</div>}
                    </div>}
                    {trans == "reg" && my_comm == "" && <div style={{ marginLeft: "20px" }}><br />
                        {role != "Administrator" && <button className="button2" onClick={() => Request(1)}>Request for promotion</button>}<br />
                        {role != "Buyer" && <button className="button2" onClick={() => Request(2)}>demotion of the role</button>}
                        <br /><br /><br /><br /></div>}
                    {trans == "prog" && <div style={{ float: "left", marginLeft: "200px" }}><center><br /><br /><br /><img src={pusk} width="200" alt="" /></center></div>}
                    {my_comm == "" && trans == "" && PURCHASES == "" && <div><br /><br /><br /><br /><br /><br /></div>}
                    {trans == "prog" && <div><br /><br /><br /><br /><br /><br /></div>}
                </div>}
                {dei == "ACTIONS" && <div><br /></div>}
            </div>

        </>
    );
};
export default Page_5;