# tsplib.js

(partially) parse TSPLIB files

http://www.iwr.uni-heidelberg.de/groups/comopt/software/TSPLIB95/DOC.PS

	var fs = require('fs')
	var TSPLIB = require('./tsplib');
	var s = fs.readFileSync('../TSPLIB95/kroA100.tsp').toString();
	var p = TSPLIB.parse(s);

Now `p` looks like

```js
	{ name: 'kroA100',
	  type: 'TSP',
	  dimension: 100,
	  edgeWeightType: 'EUC_2D',
	  nodes:
	   [ [ 1, 1380, 939 ],
	     [ 2, 2848, 96 ],
	     [ 3, 3510, 1671 ],
	     [ 4, 457, 334 ],
	     /* .... */
	   ]
	}
```
