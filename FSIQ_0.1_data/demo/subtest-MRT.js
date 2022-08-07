var subtest_MRT = 
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
	shapedata : null,
	// function to load images
	preload : function() 
	{
		icondata=fetch('shapes.json').then(response => {
		return response.json();
		}).then(function(data) {
	    	this.shapedata = data;});
	},
	targetContainer: null,
	setTargetContainer : function(c)
	{
		this.targetContainer = c;
	},
	handoff: null,
	currentq : 1,
	setHandoff: function(handoff_func)
	{
		this.handoff = handoff_func;
	},
	userReady: function()
	{
		document.getElementById("mrtintro").style.display = "none";
		document.getElementById("mrtdisplay").style.display = "block";

		this.loadQuestion(1);
	},
	getData : function()
	{
		return JSON.stringify(this.testdata);
	},
	loadQuestion : function(qid)
	{
		var ans = [10*qid+1,10*qid+2,10*qid+3,10*qid+4,10*qid+5,10*qid+6,10*qid+7,10*qid+8];
		this.helper_shuffle(ans);
		document.getElementById("mrtqdisp").src = "data:image/png;base64,"+shapedata[""+(10*qid)];
		
		document.getElementById("A1disp").src = "data:image/png;base64,"+shapedata[ans[0]];
		document.getElementById("A2disp").src = "data:image/png;base64,"+shapedata[ans[1]];
		document.getElementById("A3disp").src = "data:image/png;base64,"+shapedata[ans[2]];
		document.getElementById("A4disp").src = "data:image/png;base64,"+shapedata[ans[3]];
		document.getElementById("A5disp").src = "data:image/png;base64,"+shapedata[ans[4]];
		document.getElementById("A6disp").src = "data:image/png;base64,"+shapedata[ans[5]];
		document.getElementById("A7disp").src = "data:image/png;base64,"+shapedata[ans[6]];
		document.getElementById("A8disp").src = "data:image/png;base64,"+shapedata[ans[7]];

		document.getElementById("mrt_ans1").value = ans[0];
		document.getElementById("mrt_ans2").value = ans[1];
		document.getElementById("mrt_ans3").value = ans[2];
		document.getElementById("mrt_ans4").value = ans[3];
		document.getElementById("mrt_ans5").value = ans[4];
		document.getElementById("mrt_ans6").value = ans[5];
		document.getElementById("mrt_ans7").value = ans[6];
		document.getElementById("mrt_ans8").value = ans[7];

		this.basetime = new Date();

		this.qblurcounter = 0;
		this.qblurtime = 0;	
	},
	basetime : null,
	testdata : {},
	qanswer : function()
	{
		var selected = [];
		
			
		for(var i = 1; i <= 8; i++ )
		{
			if(document.getElementById("mrt_ans"+i).checked)
			{
				selected.push(parseInt(document.getElementById("mrt_ans"+i).value));
				document.getElementById("mrt_ans"+i).checked = false;
			}
		}
		
		var elapsed = new Date() - this.basetime;

		this.testdata["Q"+this.currentq] = {"ans" : selected, "blurc" : this.qblurcounter, "blurt" : this.qblurtimes, "e" : elapsed};	
	
		if(this.currentq < 6)
		{
			this.currentq++;
			this.loadQuestion(this.currentq);
		}
		else
		{
			this.handoff();
		}
	},
	qblurcounter : 0,
	qblurstart : 0,
	qblurtimes : [],
	focuslost : function()
	{
		subtest_MRT.qblurcounter += 1;
		subtest_MRT.qblurstart = new Date();
	},
	focusgained : function()
	{
		subtest_MRT.qblurtimes.push(new Date() - subtest_MRT.qblurstart);
	},
	run:  function()
	{

		window.onblur = subtest_MRT.focuslost;
		window.onfocus = subtest_MRT.focusgained;

		var t = "";

		t += '<div id="mrtintro" style="margin:0 auto;max-width:550px;">';
		t += '<h2>Mental Rotations Subtest</h2>';
		t += 'In this section you will be given an example shape and asked to select from a list of other shapes which ones are the same.';
		t += 'Each question has 8 answers, 3-5 of them will be correct. You should select as many as you can that are true, but do not guess because you lose points for incorrect guesses.';
		t += '<br/><br/>';
		t += '<input type="button" onclick="subtest_MRT.userReady();" value="Start"></input>';
		t += '</div>';

		t += '<div id="mrtdisplay" style="display:none;">';
		t += '<div  style="margin:0 auto;width:155px;height:155px;">';
		t += '<img id="mrtqdisp"></img></div>';
		t += '<div style="display: flex;justify-content: center;">';
		t += '<div style="display: inline-block;border:2px solid #B0C4DE;padding:0px;background-color:#F0F8FF;font-size:80%;">';
		t += '<div style="background-color:#B0C4DE;padding:5px;">';
		t += '	Which of these shapes are the same as above?';
		t += '</div>';
		t += '<table>';
		t += '<tr>';
		t += '<td align="center">';
		t += '	<label><img id="A1disp"></img><br/><input id="mrt_ans1" type="checkbox" value="1" /></label>';
		t += '</td>';
		t += '<td align="center">';
		t += '	<label><img id="A2disp"></img><br/><input id="mrt_ans2" type="checkbox" value="1" /></label>';
		t += '</td>';
		t += '<td align="center">';
		t += '	<label><img id="A3disp"></img><br/><input id="mrt_ans3" type="checkbox" value="1" /></label>';
		t += '</td>';
		t += '</tr>';
		t += '<tr>';
		t += '<td align="center">';
		t += '	<label><img id="A4disp"></img><br/><input id="mrt_ans4" type="checkbox" value="1" /></label>';
		t += '</td>';
		t += '<td align="center">';
		t += '	<label><img id="A5disp"></img><br/><input id="mrt_ans5" type="checkbox" value="1" /></label>';
		t += '</td>';
		t += '<td align="center">';
		t += '	<label><img id="A6disp"></img><br/><input id="mrt_ans6" type="checkbox" value="1" /></label>';
		t += '</td>';
		t += '</tr>';
		t += '<tr>';
		t += '<td align="center">';
		t += '	<label><img id="A7disp"></img><br/><input id="mrt_ans7" type="checkbox" value="1" /></label>';
		t += '</td>';
		t += '<td align="center">';
		t += '	<label><img id="A8disp"></img><br/><input id="mrt_ans8" type="checkbox" value="1" /></label>';
		t += '</td>';
		t += '<td align="center">';
		t += '	<input id="nextb" type="button" value="Next" onclick="subtest_MRT.qanswer()" />';
		t += '</td>';
		t += '</table>';
		t += '</div>';
		t += '</div>';
		t += '</div>';



		document.getElementById(this.targetContainer).innerHTML = t;
	}
}
