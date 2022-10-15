import {html, LitElement} from "lit-element";
import { unsafeHTML } from 'lit-html/directives/unsafe-html'
import {milligram} from "../milligram";
import {initCss as initCss} from "../init-css";

import { installRouter } from "pwa-helpers"

import MarkdownIt from 'markdown-it';


class BlogPost extends LitElement {
    static styles = [milligram, initCss]

    static get properties() {
        return {
            data: {type: String},
        };
    }

    constructor() {
        super();

        let md = new MarkdownIt();

        this.data = "⏳"

        installRouter((location) => {
            //console.log("😛", location, location.hash)

            fetch(`/?action=${location.hash.split("#")[1]}`)
                .then(res => res.text())
                .then(mdtext => {
                    //console.log(mdtext)
                    let mdContent = md.render(mdtext);
                    //console.log(mdContent)
                    this.data = mdContent;
                })
                .catch(err => {
                    //console.log(err)
                    this.data = err
                })

            /*
            switch (location.hash) {
                case "#display/one":
                    this.subComponent = html`<title-one></title-one>`
                    break
                case "#display/two":
                    this.subComponent = html`<title-two></title-two>`
                    break
                case "#display/three":
                    this.subComponent = html`<title-three></title-three>`
                    break
                default:
                    break
            }
             */
        })

    }

    render() {
        return html`${unsafeHTML(this.data)}`;
    }
}

customElements.define('blog-post', BlogPost);
