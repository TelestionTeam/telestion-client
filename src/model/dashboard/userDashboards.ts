import Dashboard from './Dashboard';

interface UserDashboards {
	[key: string]: Dashboard[];
}

const userDashboards: UserDashboards = {
	admin: [
		{
			name: 'Overview',
			items: [
				{
					cols: 2,
					rows: 2,
					widget: 'mapWidget',
					props: {
						title: 'Simple Widget'
					}
				},
				{
					cols: 1,
					rows: 2,
					widget: 'lineGraphWidget',
					props: {
						title: 'Simple Widget'
					}
				},
				{
					cols: 1,
					rows: 4,
					widget: 'procedureWidget',
					props: {
						title: 'Simple Widget'
					}
				},
				{
					cols: 3,
					rows: 2,
					widget: 'myAwesomeWidget',
					props: {}
				}
			]
		},
		{
			name: 'Special',
			items: [
				{
					cols: 2,
					rows: 4,
					widget: 'simpleWidget',
					props: {
						title: 'Simple Widget'
					}
				},
				{
					cols: 2,
					rows: 4,
					widget: 'simpleWidgetlaim',
					props: {
						title: 'Simple Widget laim'
					}
				}
			]
		},
		{
			name: 'Wind',
			items: [
				{
					cols: 2,
					rows: 2,
					widget: 'mapWidgetWind',
					props: {
						title: 'Simple Wind Widget'
					}
				},
				{
					cols: 1,
					rows: 1,
					widget: 'simpleWidget',
					props: {
						title: 'Simple Widget'
					}
				},
				{
					cols: 1,
					rows: 1,
					widget: 'simpleWidgetlaim',
					props: {
						title: 'Seed location with wind probably'
					}
				}
			]
		}
	]
};

export default userDashboards;
