package main

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

type book struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
}

type userInfo struct {
	Name          string `json:"name"`
	Picture       string `json:"picture"`
	Iss           string `json:"iss"`
	Aud           string `json:"aud"`
	AuthTime      int    `json:"auth_time"`
	UserID        string `json:"user_id"`
	Sub           string `json:"sub"`
	Iat           int    `json:"iat"`
	Exp           int    `json:"exp"`
	Email         string `json:"email"`
	EmailVerified bool   `json:"email_verified"`
	Firebase      struct {
		Identities struct {
			GoogleCom []string `json:"google.com"`
			Email     []string `json:"email"`
		} `json:"identities"`
		SignInProvider string `json:"sign_in_provider"`
	} `json:"firebase"`
}

func main() {
	e := echo.New()
	port := "1323"

	if len(os.Getenv("PORT")) != 0 {
		port = os.Getenv("PORT")
	}

	books := []book{
		{ID: 1, Title: "Sample book 1", Description: "This is first sample book"},
		{ID: 2, Title: "Sample book 2", Description: "This is second sample book"},
		{ID: 3, Title: "Sample book 3", Description: "This is third sample book"},
	}

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{http.MethodGet},
	}))

	e.Static("/", "assets")

	e.GET("/mirror", func(c echo.Context) error {
		encoded := c.Request().Header.Get("X-Apigateway-Api-Userinfo")
		decoded, err := base64.RawURLEncoding.DecodeString(encoded)

		if err != nil {
			fmt.Println(err)
		}

		var user userInfo
		err = json.Unmarshal(decoded, &user)

		if err != nil {
			fmt.Println(err)
		}

		return c.JSON(http.StatusOK, user)
	})
	e.GET("/protected", func(c echo.Context) error {
		return c.JSON(http.StatusOK, books)
	})
	e.GET("/unprotected", func(c echo.Context) error {
		return c.JSON(http.StatusOK, books)
	})

	e.Logger.Fatal(e.Start(":" + port))
}

func CorsHeader(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		c.Response().Header().Set(echo.HeaderAccessControlAllowOrigin, "*")

		return next(c)
	}
}
