import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import Footer, { FooterProps } from "./Footer.11ty";
import { renderToString } from "jsx-async-runtime";

const props: FooterProps = { copyright: "Copyright" };

test("Footer", async () => {
	document.body.innerHTML = await renderToString(Footer(props));
	expect(screen.getByRole("link", { name: "Terms of Use" })).toBeTruthy();
});
