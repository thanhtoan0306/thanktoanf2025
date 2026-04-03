import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
	// Build a base server URL that works for local dev + most deployments.
	const serverUrl = `${url.protocol}//${url.host}`;

	const spec = {
		openapi: '3.0.3',
		info: {
			title: 'thanktoanf API',
			version: '0.1.0',
		},
		servers: [{ url: serverUrl }],
		paths: {
			'/api/helloworld': {
				get: {
					summary: 'Hello World',
					responses: {
						'200': {
							description: 'OK',
							content: {
								'application/json': {
									schema: {
										type: 'object',
										properties: { message: { type: 'string' } },
										required: ['message'],
									},
									examples: { ok: { value: { message: 'Hello World' } } },
								},
							},
						},
					},
				},
			},
			'/api/md-items': {
				get: {
					summary: 'List items in /md folder',
					responses: {
						'200': {
							description: 'OK',
							content: {
								'application/json': {
									schema: {
										type: 'object',
										properties: {
											count: { type: 'integer' },
											items: {
												type: 'array',
												items: {
													type: 'object',
													properties: {
														name: { type: 'string' },
														type: { type: 'string', enum: ['file', 'dir'] },
													},
													required: ['name', 'type'],
												},
											},
										},
										required: ['count', 'items'],
									},
								},
							},
						},
						'500': {
							description: 'Failed to read folder',
						},
					},
				},
			},
			'/api/todos': {
				get: {
					summary: 'List todos (mock)',
					responses: {
						'200': {
							description: 'OK',
							content: {
								'application/json': {
									schema: {
										type: 'object',
										properties: {
											items: {
												type: 'array',
												items: {
													type: 'object',
													properties: {
														id: { type: 'string' },
														title: { type: 'string' },
														status: { type: 'string' },
													},
													required: ['id', 'title', 'status'],
												},
											},
										},
										required: ['items'],
									},
								},
							},
						},
					},
				},
				post: {
					summary: 'Create todo (mock)',
					requestBody: {
						required: true,
						content: {
							'application/json': {
								schema: {
									type: 'object',
									properties: {
										id: { type: 'string' },
										title: { type: 'string' },
										status: { type: 'string' },
									},
								},
								examples: {
									create: { value: { title: 'hello', status: 'active' } },
								},
							},
						},
					},
					responses: {
						'201': { description: 'Created' },
						'400': { description: 'Invalid JSON' },
					},
				},
			},
			'/api/md-preview/{name}': {
				get: {
					summary: 'Get markdown content by name',
					parameters: [
						{
							name: 'name',
							in: 'path',
							required: true,
							schema: { type: 'string', example: 'bacteria.md' },
						},
					],
					responses: {
						'200': {
							description: 'OK',
							content: {
								'application/json': {
									schema: {
										type: 'object',
										properties: {
											name: { type: 'string' },
											content: { type: 'string' },
										},
										required: ['name', 'content'],
									},
								},
							},
						},
						'400': { description: 'Invalid name' },
						'404': { description: 'Not found' },
					},
				},
			},
		},
	} as const;

	return new Response(JSON.stringify(spec), {
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Cache-Control': 'no-store',
		},
	});
};

