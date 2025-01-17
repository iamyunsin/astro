import * as assert from 'node:assert/strict';
import { describe, it, before } from 'node:test';
import nodejs from '../dist/index.js';
import { loadFixture, createRequestAndResponse } from './test-utils.js';

describe('Encoded Pathname', () => {
	/** @type {import('./test-utils').Fixture} */
	let fixture;

	before(async () => {
		fixture = await loadFixture({
			root: './fixtures/encoded/',
			output: 'server',
			adapter: nodejs({ mode: 'middleware' }),
		});
		await fixture.build();
	});

	it('Can get an Astro file', async () => {
		const { handler } = await import('./fixtures/encoded/dist/server/entry.mjs');
		let { req, res, text } = createRequestAndResponse({
			url: '/什么',
		});

		handler(req, res);
		req.send();

		const html = await text();
		assert.equal(html.includes('什么</h1>'), true);
	});

	it('Can get a Markdown file', async () => {
		const { handler } = await import('./fixtures/encoded/dist/server/entry.mjs');

		let { req, res, text } = createRequestAndResponse({
			url: '/blog/什么',
		});

		handler(req, res);
		req.send();

		const html = await text();
		assert.equal(html.includes('什么</h1>'), true);
	});
});
