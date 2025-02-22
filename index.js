#!/usr/bin/env node
/**
 *  Entry point for markdown-autodocs CLI app
 *  Author: Dinesh Sonachalam
 */

import {app} from './utils/app.js'
import pkg from 'log4js';
const { getLogger } = pkg;
import {Command} from 'commander/esm.mjs';

export const gitCliargs = function() {
  const program = new Command();
  program
    .option('-o, --outputFilePath <outputFilePaths...>', 'Output file paths')
    .option('-c, --category <categories...>', 'code-block, json-to-html-table, workflow-artifact-table')
    .option('-r, --repo <type>', 'Repo name')
    .option('-b, --branch <type>', 'Branch name')
    .option('-a, --accessToken <type>', 'Github Access token')  
  program.parse(process.argv)
  const options = program.opts()
  return options
}

export const main = async function() {
  const logger = getLogger();
  logger.level = "info";
  const options = gitCliargs()
  const outputFilePaths = options.outputFilePath
  const categories = options.category
  const repo = options.repo
  const branch = options.branch
  const accessToken = options.accessToken
  for (const outputFilePath of outputFilePaths){
    for (const category of categories){
        const message = await app(outputFilePath, category, repo, branch, accessToken)
        logger.info(message) 
    }
  }
}

await main()