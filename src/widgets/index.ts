import WidgetList from '../model/dashboard/WidgetList';

import SimpleWidget from './SimpleWidget/SimpleWidget';
import MapWidget from './MapWidget/MapWidget';
import ProcedureWidget from './ProcedureWidget/ProcedureWidget';
import LineGraphWidget from './LineGraphWidget/LineGraphWidget';
import SimpleWidgetlaim from "./SimpleWidgetlaim/SimpleWidgetlaim";
import MapWidgetWind from "./MapWidgetWind/MapWidgetWind";

const widgets: WidgetList = {
	simpleWidget: SimpleWidget,
	mapWidget: MapWidget,
	procedureWidget: ProcedureWidget,
	lineGraphWidget: LineGraphWidget,
	simpleWidgetlaim: SimpleWidgetlaim,
	mapWidgetWind: MapWidgetWind
};

export default widgets;
