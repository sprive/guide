#!/usr/bin/env vite-node --script

import { migrateFrontMatter, writeCleanResources } from "./cleaner";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import chalk from "chalk";
import { dumpObsoletes } from "./obsoletes";

const info = chalk.hex("#087CFA");
const success = chalk.hex("#21D789");
const error = chalk.hex("#F45C4A");

/**
 * --help should work once https://github.com/vitest-dev/vitest/pull/3574 is merged and published
 * TODO: implement meaningful defaults and configuration options
 */
yargs(hideBin(process.argv))
	.command(
		"clean",
		"run clean script",
		{
			debug: {
				alias: "d",
				default: false,
			},
		},
		(args) => {
			try {
				console.log(info("Going to run clean up script"));
				writeCleanResources();
				console.log(success("Clean up script successful 🎉🎉🎉"));
			} catch (e) {
				console.log(error("error executing cleanup script"));
				if (args.debug) {
					console.log(info(e));
				}
			}
		}
	)
	.command(
		"migrate-frontmatter",
		"migrate old gatsby frontmatter",
		{
			debug: {
				alias: "d",
				default: false,
			},
		},
		(args) => {
			try {
				console.log(info("Going to clean frontmatter"));
				migrateFrontMatter();
				console.log(success("cleaning up frontmatter successful 🎉🎉🎉"));
			} catch (e) {
				console.log(error("error executing frontmatter migration script"));
				if (args.debug) {
					console.log(info(e));
				}
			}
		}
	)
	.command(
		"dump-obsoletes",
		"dump obsoletes for nginx to be picked up",
		{
			debug: {
				alias: "d",
				default: false,
			},
		},
		(args) => {
			try {
				console.log(info("Going to write nginx rules for obsolete documents"));

				dumpObsoletes();
				console.log(success("nginx rules written successful 🎉🎉🎉"));
			} catch (e) {
				console.log(error("error writing nginx rules"));
				if (args.debug) {
					console.log(info(e));
				}
			}
		}
	)
	.help().argv;
