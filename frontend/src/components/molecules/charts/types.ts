export interface IApexChartsOptions {
	series: { name: string, data: number[] }[]
	chart: {
		type: 'area' | 'bar',
		toolbar: {
			show: boolean,
		},
	},
	dataLabels: {
		enabled: boolean,
	},
	xaxis: {
		type: string,
		categories: string[],
		labels: {
			show: boolean,
			hideOverlappingLabels: boolean,
		},
	},
	grid: {
		padding: {
			right: number,
			left: number,
		},
	},
}
