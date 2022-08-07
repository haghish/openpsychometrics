var subtest_ISM = 
{
	// helper function that shuffles array
	helper_shuffle : function(a)
	{
		var ci = a.length, t, r;
		while (0 !== ci) 
		{
			r = Math.floor(Math.random() * ci); ci -= 1;
			t = a[ci]; a[ci] = a[r]; a[r] = t;
		}
		
		return a;
	},
	// variable that stores the image data of all the icons
	icondata : null,
	// function to load images
	preload : function() 
	{
		icondata=fetch('icons.json').then(response => {
		return response.json();
		}).then(function(data) {
	    	this.icondata = data;});
	},
	seq_counter: 0,
	seq_correctans: null,
	seq_key: [
	[ [1,2,3,4,        27,74                  ],  [1,2,3,4,51,52,53,54    ], 1500 ],
	[ [5,6,7,          29,30,75,80            ],  [5,6,7,55,56,57,58,59   ], 1000 ],
	[ [8,9,10,11,      32,33,34,76,81         ],  [8,9,10,11,60,61,62,63  ], 900 ],
	[ [12,13,14,15,16, 85,37,38,39,77,82      ],  [12,13,14,15,16,64,65,66], 800 ],
	[ [17,18,19,20,21, 40,41,42,43,44,78,83   ],  [17,18,19,20,21,67,68,69], 700 ],
	[ [22,23,24,25,26, 45,46,47,48,49,50,79,84],  [22,23,24,25,26,70,71,72], 600 ]
	],
	startSeq: function()
	{
		this.helper_shuffle(this.seq_key[this.seq_counter][0]);
		this.helper_shuffle(this.seq_key[this.seq_counter][1]);

		this.seq_correctans = this.seq_key[this.seq_counter][0].slice(0);
	
		this.updateSeq(this.seq_key[this.seq_counter][0]);
		
		document.getElementById("seq_beginbutton").style.display = "none";
		document.getElementById("seq_sign").style.display = "none";
		document.getElementById("sequence").style.display = "block";
	},
	testdata : {},
	updateSeq: function(left)
	{
		if(left.length > 0)
		{
			var cur = left.pop();
			var sd = document.getElementById("sequence");
			sd.src = "data:image/png;base64,"+icondata["I"+cur]+"";

			this.counter--;
			setTimeout("subtest_ISM.updateSeq(["+left.toString()+"]);",this.seq_key[this.seq_counter][2]);
		}
		else
		{
			var sd = document.getElementById("sequence");
			sd.src = "";
			this.showanswer(this.seq_key[this.seq_counter][1]);
		}
	},
	showanswer: function(answers)
	{
		this.qblurcounter = 0;
		this.qblurtimes = [];
		for(var i = 0; i < 8; i++ )
		{
			document.getElementById("A"+(1+i)).checked = false;
			document.getElementById("A"+(1+i)).value = answers[i];
			document.getElementById("A"+(1+i)+"D").src = "data:image/png;base64,"+icondata["I"+answers[i]]+"";		
		}

		document.getElementById("anspanel").style.display = "table";
		document.getElementById("seqdisplay").style.display = "none";

		this.basetime = new Date()
	},
	basetime : null,
	seqans:function()
	{
		var answers = [];

		for(var i = 0; i < 8; i++)
		{
			if(document.getElementById("A"+(1+i)).checked)
			{
				answers.push(parseInt(document.getElementById("A"+(1+i)).value));
			}
		}

		var elapse = new Date() - this.basetime;

		this.testdata["Q"+(1+this.seq_counter)] = {"e" : elapse, "ans" : answers, "blurc": this.qblurcounter,"blurt": this.qblurtimes};

		if ( this.seq_counter < 5)
		{
			this.seq_counter++;
			document.getElementById("seq_beginbutton").style.display = "block";
			document.getElementById("seq_sign").innerHTML = "Sequence "+(1+this.seq_counter)+" of 6.<Br/><Br/>";
			document.getElementById("seq_sign").style.display = "block";

			document.getElementById("anspanel").style.display = "none";
			document.getElementById("seqdisplay").style.display = "block";
			document.getElementById("sequence").style.display = "none";
		}
		else
		{
			this.handoff();
		}
	},
	setTargetContainer : function(c)
	{
		this.targetContainer = c;
	},
	targetContainer: null,
	setHandoff: function(handoff_func)
	{
		this.handoff = handoff_func;
	},
	userReady: function()
	{
		document.getElementById("seqintro").style.display = "none";
		document.getElementById("seqdisplay").style.display = "block";
	},
	getData : function()
	{
		return JSON.stringify(this.testdata);
	},
	qblurcounter : 0,
	qblurstart : 0,
	qblurtimes : [],
	focuslost : function()
	{
		subtest_ISM.qblurcounter += 1;
		subtest_ISM.qblurstart = new Date();
	},
	focusgained : function()
	{
		subtest_ISM.qblurtimes.push(new Date() - subtest_ISM.qblurstart);
	},
	handoff: null,
	run:  function()
	{

		window.onblur = subtest_ISM.focuslost;
		window.onfocus = subtest_ISM.focusgained;

		var t = "";

		t += '<div id="seqintro" style="margin:0 auto;max-width:550px;">';
		t += '<h2>Working Memory Subtest</h2>';
		t += 'In this subtest you will be shown a sequence of icons one at a time. Then you will be shown 8 icons, and asked which were in the sequence you just saw. Of the eight options, 3-5 will be correct answers. You will get +1 point for each selection, and -1 point for each wrong selection so do as many as you can remember, but do not guess if you are not sure!';
		t += '';
		t += '<br/><br/>';
		t += '<input type="button" onclick="subtest_ISM.userReady();" value="Start"></input>';
		t += '</div>';


		t += '<div id="seqdisplay" style="margin:0 auto;max-width:250px;border:2px solid #B0C4DE; display:none;padding:0px;background-color:#F0F8FF;">';
		t += '<div style="background-color:#B0C4DE;padding:5px;max-width:250px;">';
		t += '<b>Memorize these icons</b>';
		t += '</div>';
		t += '<div style="padding:8px;max-width:250px;height:85px;background-color:F0F8FF;text-align:center;">';
		t += '<span id="seq_sign">Sequence 1 of 6<br/><br/></span>';
		t += '<input id="seq_beginbutton" type="button" value="Start sequence" onclick="subtest_ISM.startSeq();" style="margin:0 auto;display: block;" />';
		t += '<img style="margin:0 auto;display: block;" id="sequence"></img>';
		t += '</div></div>';


		t += '<div id="anspanel" style="margin:0 auto;border:2px solid #B0C4DE; display:block;padding:0px;background-color:#F0F8FF;display:none;">';

		t += '<div style="background-color:#B0C4DE;padding:5px;">';
		t += '<b>Select the ones you saw</b>';
		t += '</div>';
		t += '<div style="padding:8px;background-color:F0F8FF;">';


		t += '<table>';
		t += '<tr>';
		t += '<td align="center">';
		t += '<label><img id="A1D"></img><br/><input id="A1" type="checkbox" value="" /></label>';
		t += '</td>';
		t += '<td align="center">';
		t += '<label><img id="A2D"></img><br/><input id="A2" type="checkbox" value="" /></label>';
		t += '</td>';
		t += '<td align="center">';
		t += '<label><img id="A3D"></img><br/><input id="A3" type="checkbox" value="" /></label>';
		t += '</td>';
		t += '<td align="center">';
		t += '<label><img id="A4D"></img><br/><input id="A4" type="checkbox" value="" /></label>';
		t += '</td>';
		t += '</tr>';
		t += '<tr>';
		t += '<td align="center">';
		t += '<label><img id="A5D"></img><br/><input id="A5" type="checkbox" value="" /></label>';
		t += '</td>';
		t += '<td align="center">';
		t += '<label><img id="A6D"></img><br/><input id="A6" type="checkbox" value="" /></label>';
		t += '</td>';
		t += '<td align="center">';
		t += '<label><img id="A7D"></img><br/><input id="A7" type="checkbox" value="" /></label>';
		t += '</td>';
		t += '<td align="center">';
		t += '<label><img id="A8D"></img><br/><input id="A8" type="checkbox" value="" /></label>';
		t += '</td>';
		t += '</tr>';
		t += '<tr>';
		t += '<td colspan="4">';
		t += '<br/><br/>';
		t += '<input type="button" value="Next" onclick="subtest_ISM.seqans();" />';
		t += '</td>';
		t += '</tr>';
		t += '</table>';

		t += '</div>';
		t += '</div>';

		document.getElementById(this.targetContainer).innerHTML = t;
	}
}
