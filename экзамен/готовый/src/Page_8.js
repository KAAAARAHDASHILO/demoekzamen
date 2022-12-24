import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { UseColorContext, UseContext } from "./Contract/Context";
import lupa from './lupa.svg'
import lupa2 from './lupa2.svg'
import pusk from './pusk.gif'

const Page_8 = () => {
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
    const [mas, mass] = useState(["ACTIONS", "PRODUCTS", "THEME"]);
    const [ball, ball_] = useState(1);
    const [count2, count2_] = useState("");
    const [trans, trans_] = useState("");
    const [pus, pus_] = useState("");
    const [choice, choice_] = useState("");
    const [prosmotr, prosmotr_] = useState("");
    const [name, name_] = useState("");
    const [number2, number2_] = useState(0);
    const [leng, leng_] = useState("");
    const [mag, mag_] = useState("");
    const [dei, dei_] = useState("");
    const [mess, mess_] = useState("");
    const [messe, messe_] = useState("");
    const [time, time_] = useState("");
    const [hours, hours_] = useState("");
    const [name2, name2_] = useState("");
    const [srok, srok_] = useState("");
    const [temp, temp_] = useState(-40);
    const [temp2, temp2_] = useState(40);
    const [time2, time2_] = useState("");
    const [hours2, hours2_] = useState("");
    const [time3, time3_] = useState("");
    const [hours3, hours3_] = useState("");
    const [price, price_] = useState("");
    const [C, C_] = useState([]);
    const [score_two, score_two_] = useState("");
    const [prod, prod_] = useState("");
    const [prods, prods_] = useState("");
    const [click, click_] = useState("");
    const [click2, click2_] = useState("");
    const [name_prod, name_prod_] = useState([]);
    sessionStorage.setItem("address", address);
    sessionStorage.setItem("password", password);
    sessionStorage.setItem("login", login);
    sessionStorage.setItem("score", score);
    sessionStorage.setItem("FIO", FIO);
    sessionStorage.setItem("role", role);
    sessionStorage.setItem("city", city);

    //setInterval(() => web3.eth.personal.unlockAccount(address, password), 30000);

    async function list(e) {

        if (e.target.value == "ACTIONS") {
            let c = await Contract.methods.LENGHT_SHOP().call();
            var l = 0;
            for (let i = 0; i < c[4]; i++) {
                let b = await Contract.methods.Viewing_PROD(i).call()
                if (b != "Data deleted")
                    l++;
            }
            leng_(l);
            dei_("ACTIONS");
        }

        if (e.target.value == "PRODUCTS") {
            let c = await Contract.methods.LENGHT_SHOP().call();
            var l = 0;
            let p = "";
            for (let i = 0; i < c[4]; i++) {
                let b = await Contract.methods.Viewing_PROD(i).call()
                if (b != "Data deleted") {
                    l++;
                    p += b + ", ";
                }
            }
            leng_(l);
            mag_(p);
            prod_("PRODUCTS");
        }
        if (e.target.value == "THEME") {
            setColor(!w);
            w_(!w);
        }
        e.target.value = "";
    }

    async function exit(a) {
        if (a == "dei") { trans_(""); dei_(""); name2_(""); srok_(""); temp_(-40); temp2_(40); ball_(""); price_(""); trans_(""); click_(""); }
        if (a == "messe") messe_("");
        if (a == "prod") prod_("");
        if (a == "pus") pus_("");
        if (a == "reg") { click_(a); trans_(a); }
        if (a == "delete") {
            click_(a); name2_(""); srok_(""); temp_(-40); temp2_(40); ball_(""); price_(""); trans_(""); trans_(a);
            let c = await Contract.methods.LENGHT_SHOP().call();
            let p = [];
            let d = 0;
            for (let i = 0; i < c[4]; i++) {
                let b = await Contract.methods.Viewing_PROD(i).call()
                if (b != "Data deleted") {
                    p[d] = b;
                    d++;
                }
            }
            name_prod_(p);
        }
    }

    async function lit(e) {
        prods_(e.target.value);
    }

    async function search() {
        click2_(1);
        if (name != "") {
            pus_("false");
            try {
                let a = await Contract.methods.Viewing_PRODUCT(name).call();
                prosmotr_(a);
                C_(a[4]);
                if (a[2] != 0) {
                    var d = new Date(a[2] * 1000),
                        yyyy = d.getFullYear(),
                        mm = ("0" + (d.getMonth() + 1)).slice(-2),
                        dd = ("0" + d.getDate()).slice(-2),
                        hh = d.getHours(),
                        h = hh,
                        min = ("0" + d.getMinutes()).slice(-2);
                    hours2_(h + ":" + min);
                    time2_(dd + "." + mm + "." + yyyy + " г.");

                    var z = new Date(a[3] * 1000),
                        yyyy = z.getFullYear(),
                        mm = ("0" + (z.getMonth() + 1)).slice(-2),
                        dd = ("0" + z.getDate()).slice(-2),
                        hh = d.getHours(),
                        h = hh,
                        min = ("0" + z.getMinutes()).slice(-2);
                    hours3_(h + ":" + min);
                    time3_(dd + "." + mm + "." + yyyy + " г.");
                    choice_("title")
                    pus_("true");
                }
                else {
                    choice_("mistake");
                    pus_("not");
                }
            }
            catch {
                choice_("mistake");
                pus_("not");
            }
        }
        else alert("ERROR, MAKE SURE THAT THE FIELD IS FILLED IN!");
        click2_("");
    }

    async function changeHandler(event) {
        ball_(event);
    }

    async function Registration_PRODUCT() {
        trans_("prog");
        try {
            if (name2 != "" && srok != "" && temp != "" && ball != "" && price != "") {
                await Contract.methods.Registration_PRODUCT(name2, srok, temp, temp2, ball, price).send({ from: address });
                let c = await Contract.methods.LENGHT_SHOP().call();
                var l = 0;
                let p = "";
                for (let i = 0; i < c[4]; i++) {
                    let b = await Contract.methods.Viewing_PROD(i).call()
                    if (b != "Data deleted") {
                        l++;
                        p += b + ", ";
                    }
                }
                leng_(l);
                mag_(p);
                name2_(""); srok_(""); temp_(-40); temp2_(40); ball_(""); price_(""); trans_("");
            }
            else {
                alert("ERROR, MAKE SURE THAT ALL THE FIELDS ARE FILLED IN!");
                trans_("reg"); name2_(""); srok_(""); temp_(-40); temp2_(40); ball_(""); price_("");
            }
        } catch {
            alert("The error may be: \n 1. Check that the fields are filled in correctly.");
            trans_("reg"); name2_(""); srok_(""); temp_(-40); temp2_(40); ball_(""); price_("");
        }
        click_("");
    }

    async function Delete_PRODUCT() {
        trans_("prog");
        await Contract.methods.Delete_PRODUCT(prods).send({ from: address });
        let c = await Contract.methods.LENGHT_SHOP().call();
        var l = 0;
        let p = "";
        for (let i = 0; i < c[4]; i++) {
            let b = await Contract.methods.Viewing_PROD(i).call()
            if (b != "Data deleted") {
                l++;
                p += b + ", ";
            }
        }
        leng_(l);
        mag_(p);
        let g = [];
        let d = 0;
        for (let i = 0; i < c[4]; i++) {
            let b = await Contract.methods.Viewing_PROD(i).call()
            if (b != "Data deleted") {
                g[d] = b;
                d++;
            }
        }
        name_prod_(g);
        trans_("delete");click_("");
    }

    return (
        <>
            <header className="navbar_two">
                <select className="text" onChange={list}>
                    <option value='' hidden>OPTIONS</option>
                    {mas.map((arr, i) => <option key={i} value={String(arr)}>
                        {arr}
                    </option>)}</select>
                <div>
                    <input className="input_two" type="text" placeholder="&emsp;search" value={name} onChange={(e) => name_(e.target.value)} />
                    {click2 != 1 &&<button className="text" onClick={search} > <img src={lupa} width="30" alt="" /></button>}
                    {click2 == 1 &&<button className="text"> <img src={lupa2} width="30" alt="" /></button>}</div>

                <Link to="./Page_1"><button className="text">EXIT</button></Link>
            </header>
            <br />

            <div style={{ float: "left", marginLeft: "40px" }}>
                <div className="message_two5"><br />
                    <div style={{ fontSize: "45px", fontWeight: "bolder" }}><center>SUPPLIER'S PERSONAL PAGE</center></div><br />
                    &nbsp;Login:&nbsp;{login}<br />
                    {score_two == "" && <div>&nbsp;Current balance:&nbsp;{Math.round(parseFloat(score) * 100) / 100}<br /></div>}
                    {score_two != "" && <div>&nbsp;Current balance:&nbsp;{Math.round(parseFloat(score_two) * 100) / 100}<br /></div>}<br />
                </div><br />
                {pus == "false" && (<div className="message_two" >
                    <div style={{ float: "right", marginRight: "20px" }}><button className="text_two" onClick={() => exit("pus")}>&#10006;</button></div><br />
                    <div style={{ backgroundColor: "#ffffff" }}><br /><br />
                        <center><img src={pusk} width="200" alt="" /></center><br /><br /></div></div>)}
                {pus == "not" && choice == "mistake" && (<div className="message_two" >
                    <div style={{ float: "right", marginRight: "20px" }}><button className="text_two" onClick={() => exit("pus")}>&#10006;</button></div><br />
                    <div style={{ backgroundColor: "#ffffff" }}><br /><br /><br />
                        <center>ERROR</center><br /><br /><br /></div></div>)}
                {pus == "true" && choice == "title" && (<div className="message_two" >
                    <div style={{ float: "right", marginRight: "20px" }}><button className="text_two" onClick={() => exit("pus")}>&#10006;</button></div><br />
                    <div style={{ backgroundColor: "#ffffff" }}>
                        &nbsp;Title:&nbsp;{prosmotr[0]}<br />
                        &nbsp;Manufacturer:&nbsp;{prosmotr[1]}<br />
                        &nbsp;Date of manufacture:&nbsp;{time2} {hours2}<br />
                        &nbsp;Expiration date:&nbsp;{time3} {hours3}<br />
                        &nbsp;Storage temperature:&nbsp;from&nbsp;{C[0]}&nbsp;before&nbsp;{C[1]} t°<br />
                        {prosmotr[5] == 2 && <div>&nbsp;Unit of measurement:&nbsp;in PIECES<br /></div>}
                        {prosmotr[5] == 1 && <div>&nbsp;Unit of measurement:&nbsp;in KG<br /></div>}
                        &nbsp;The basic price of the product:&nbsp;{prosmotr[6]}<br />
                    </div>
                </div>)}
            </div>

            <div style={{ float: "right" }}>
                {dei == "ACTIONS" && <div className="mes_but2" style={{ marginRight: "40px" }}>
                    <button style={{ float: "right", marginRight: "20px" }} className="text_two" onClick={() => exit("dei")}>&#10006;</button>
                    <div style={{ float: "right" }}><br />
                        {click != "reg" && <button className="button2" onClick={() => exit("reg")}>ADD A PRODUCT</button>}
                        {click == "reg" && <button className="buttone" >ADD A PRODUCT</button>}{leng != 0 && <br />}
                        {leng != 0 && click != "delete" && <button className="button2" onClick={() => exit("delete")}>DELETE A PRODUCT</button>}
                        {leng != 0 && click == "delete" && <button className="buttone" >DELETE A PRODUCT</button>}
                    </div>
                    {trans == "prog" && <div style={{ float: "left", marginLeft: "200px" }}><center><br /><br /><br /><img src={pusk} width="200" alt="" /></center></div>}
                    {trans == "reg" && <div style={{ float: "left", marginLeft: "100px" }}>
                        <input className="input" placeholder="PRODUCT NAME" type="text" value={name2} onChange={(e) => name2_(e.target.value)}></input><br />
                        <br />
                        <input className="input" type="number" min="1" step="1" placeholder="TERM IN MINUTES" value={srok} onChange={(e) => srok_(e.target.value)}></input><br /><br />
                        STORAGE TEMPERATURE <br />
                        from&nbsp;<input className="input" type="number" min="-40" step="1" max={temp2} value={temp} onChange={(e) => temp_(e.target.value)} />&nbsp;to&nbsp;
                        <input className="input" type="number" min={temp} step="1" max="40" value={temp2} onChange={(e) => temp2_(e.target.value)} /><br />
                        <br />
                        <input className="input" placeholder="BASE PRICE" type="number" min="1" step="1" value={price} onChange={(e) => price_(e.target.value)} /><br />
                        KG
                        <input className="inputs" type="radio" name="radio"
                            onChange={() => changeHandler("1")} />
                        &nbsp;
                        PIECES
                        <input className="inputs" type="radio" name="radio"
                            onChange={() => changeHandler("2")} />
                        <br />
                        <button className="button3" onClick={Registration_PRODUCT}>ADD</button></div>}
                    {trans == "delete" && <div style={{ float: "left", marginLeft: "100px" }}><br /><br /><br /><br />
                        &nbsp;<select className="text_two2" onChange={lit}>
                            <option value='' hidden>PRODUCT NAME</option>
                            {name_prod.map((arr, i) => <option key={i} value={String(arr)}>
                                {arr}
                            </option>)}</select><br />
                        <button className="button3" onClick={Delete_PRODUCT}>DELETE</button>
                    </div>}
                </div>}

                {prod == "PRODUCTS" && <div>
                    <div style={{ float: "right", marginRight: "60px" }}><button className="text_two" onClick={() => exit("prod")}>&#10006;</button></div><br />
                    <div style={{ float: "right", marginRight: "100px" }}>
                        <div className="message_foo_3" style={{ marginRight: "1px", fontSize: "20px", fontWeight: "bolder" }}><center>Products {leng}</center></div>
                        <div className="message_foo_2" style={{ marginRight: "1px", fontSize: "20px" }}><center>{mag}</center></div>
                    </div>

                </div>}

            </div>

        </>
    );
};
export default Page_8;