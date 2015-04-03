// partially parse TSPLIB format files
// http://www.iwr.uni-heidelberg.de/groups/comopt/software/TSPLIB95/DOC.PS

var whenMatch = function(line, regex, doFn) {
	var m = regex.exec(line.trim());
	if(m) {
		doFn(m);
		return true;
	}
	return false;
};

var r = function(key, value){
	if(!value)
		value = '(\\w+)';

	return new RegExp('^' + key + '\\s*:\\s*' + value + '$');
}


exports.parse = function(s) {
	var lines = s.split('\n');
	var tsp = {};

	var section = false;

	lines.forEach(function(line){

		// skip comments
		if(/^COMMENT/.test(line))
			return;

		// switch section
		if(whenMatch(line, /^([\w_]+)_SECTION/,
			function(m){
				section = m[1];
			}))
			return;

		// parsing nodes
		if(section === 'NODE_COORD' ) {
			// end of parsing
			if(/^EOF/.test(line))
				return;

			// try to parse nodeline
			whenMatch(line, /^(\d+)\s+(\d+)\s+(\d+)$/, function(m){
				if(!tsp.nodes)
					tsp.nodes = [];

				var n = parseInt(m[1]);
				var x = parseInt(m[2]);
				var y = parseInt(m[3]);
				tsp.nodes.push([n, x, y])
			})
		}

		// parse bunch of tags
		whenMatch(line, r('NAME'), function storeName(m){
			tsp.name = m[1];
		});

		whenMatch(line, r('TYPE'), function storeName(m){
			//var legal = ["TSP","ATSP","SOP","HCP","CVRP","TOUR"];
			tsp.type = m[1];
		});

		whenMatch(line, r('DIMENSION', '(\\d+)'), function storeName(m){
			tsp.dimension = parseInt(m[1]);
		});

		whenMatch(line, r('CAPACITY', '(\\d+)'), function storeName(m){
			tsp.capacity = parseInt(m[1]);
		});

		whenMatch(line, r('EDGE_WEIGHT_TYPE'), function storeName(m){
			tsp.edgeWeightType = m[1];
		});

		whenMatch(line, r('EDGE_WEIGHT_FORMAT'), function storeName(m){
			tsp.edgeWeightFormat = m[1];
		});

		whenMatch(line, r('EDGE_DATA_FORMAT'), function storeName(m){
			tsp.edgeDataFormat = m[1];
		});

		whenMatch(line, r('NODE_COORD_TYPE'), function storeName(m){
			tsp.nodeCoordType = m[1];
		});

		whenMatch(line, r('DISPLAY_DATA_TYPE'), function storeName(m){
			tsp.displayDataType = m[1];
		});
	});

	return tsp;
}


