
export const routes = [
	{
		path: '/',
		name: 'HelloWorld',
		component: resolve => require(['@/components/HelloWorld'], resolve),
		redirect: '/index',
		children: [
			{
				path: '/index',
				name: 'Index',
				component: resolve => require(['@/components/Index'], resolve)
			},
			{
				path: '/set',
				name: 'Set',
				component: resolve => require(['@/components/Set'], resolve)
			},
			{
				path: '/statistical',
				name: 'Statistical',
				component: resolve => require(['@/components/Statistical'], resolve)
			},
			{
				path: '/monitoring',
				name: 'Monitoring',
				component:  resolve => require(['@/components/Monitoring'], resolve)
			},
			{
				path: '/plan',
				name: 'Plan',
				component:  resolve => require(['@/components/Plan'], resolve)
			}
		]
	},
	{
		path: '*',
		redirect: '/'
	}

]
