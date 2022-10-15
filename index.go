package main

import (
	_ "embed"
	hf "github.com/bots-garden/capsule/capsulemodule/hostfunctions"
)

var (
	//go:embed resources/dist/index.html
	html []byte
)

func main() {
	hf.SetHandleHttp(Handle)
}

func Handle(req hf.Request) (resp hf.Response, errResp error) {

	params := req.ParseQueryString()

	switch params["action"] {
	case "header":
		// Load the introduction content
		headers := map[string]string{
			"Content-Type": "text/plain; charset=utf-8",
		}

		mdContent, err := hf.ReadFile("header.md")
		if err != nil {
			hf.Log(err.Error())
		}

		return hf.Response{Body: mdContent, Headers: headers}, err
	case "menu":
		headers := map[string]string{
			"Content-Type": "text/plain; charset=utf-8",
		}

		mdContent, err := hf.ReadFile("menu.md")
		if err != nil {
			hf.Log(err.Error())
		}

		return hf.Response{Body: mdContent, Headers: headers}, err

	default:

		// main page
		if len(params["action"]) == 0 {
			headers := map[string]string{
				"Content-Type": "text/html; charset=utf-8",
			}
			htmlPage := string(html)

			return hf.Response{Body: htmlPage, Headers: headers}, nil
		} else { // load blog post or news
			headers := map[string]string{
				"Content-Type": "text/plain; charset=utf-8",
			}
			// load blog post
			mdContent, err := hf.ReadFile(params["action"])
			if err != nil {
				// we are at the root "/", then load the news
				homeMdContent, errNews := hf.ReadFile("home.md")
				if errNews != nil {
					hf.Log("🔴" + errNews.Error())
				}
				return hf.Response{Body: homeMdContent, Headers: headers}, errNews
			}
			return hf.Response{Body: mdContent, Headers: headers}, err
		}
	}
}
