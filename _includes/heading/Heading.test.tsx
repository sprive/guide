import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import Heading, { HeadingProps } from "./Heading.11ty";
import { renderToString } from "jsx-async-runtime";

const props: HeadingProps = {
	title: "title1",
	subtitle: "subtitle1",
};

test("Heading", async () => {
	document.body.innerHTML = await renderToString(Heading(props));
	expect(screen.getByText("title1")).toBeTruthy();
	expect(screen.getByText("subtitle1")).toBeTruthy();
});
