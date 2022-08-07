var subtest_V = 
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
		document.getElementById("vintro").style.display = "none";
		document.getElementById("vdisplay").style.display = "block";

		this.loadQuestion(this.currentq);
	},
	loadQuestion : function(qid)
	{
		document.getElementById("vqdisp").innerHTML = this.vitems[this.currentq-1][0];

		var config = [1,2,3,4,5,6,7,8];
		this.helper_shuffle(config);

		for(var i = 0; i < 8; i++)
		{
			document.getElementById("Q"+(i+1)+"Disp").innerHTML = this.vitems[this.currentq-1][1][config[i]-1];
			document.getElementById("v_ans"+(i+1)).value = config[i];
			document.getElementById("v_ans"+(i+1)).checked = false;
		}

		this.basetime = new Date()
	},
	vitems: [["big",["large","huge","colossal","mammoth","small","vortian","lamiaceous","crumbled"]],
		["blame",["accuse","indict","inculpate","populate","arrast","vistify","foil","forbear"]],
		["cold",["chilly","nippy","gelid","freezing","boiling","insidious","maugre","reluctant"]],
		["stop",["halt","end","abrogate","countermand","reprobate","vestige","anneal","degrut"]],
		["short",["brief","quick","fleeting","ephemeral","wide","withal","precarious","unprepossessing"]],
		["beginner",["novice","rookie","newcomer","neophyte","tyro","connoisseur","sitter","delinquent"]],
		["thin",["sheer","narrow","skinny","diaphanous","gossamer","vehement","loupe","blustering"]]],
	basetime : null,
	testdata : {},
	qanswer : function()
	{
		var elapse = new Date() - this.basetime;
		var answered = [];

		for(var i = 0; i < 8; i++)
		{
			if(document.getElementById("v_ans"+(i+1)).checked)
			{
				answered.push(parseInt(document.getElementById("v_ans"+(i+1)).value));
			}
		}

		this.testdata["Q"+this.currentq] = {"e" : elapse, "ans" : answered, "blurc" : this.qblurcounter, "blurt" : this.qblurtimes};
		
		if(this.currentq < 7)
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
	getData : function()
	{
		return JSON.stringify(this.testdata);
	},
	run:  function()
	{
		window.onblur = subtest_MRT.focuslost;
		window.onfocus = subtest_MRT.focusgained;

		var t = "";

		t += '<div id="vintro" style="margin:0 auto;max-width:550px;">';
		t += '<h2>Vocabulary Subtest</h2>';
		t += 'In this section you will be given a word, and asked to select from a list of other words which ones means the same.';
		t += 'There will be 8 answers for each question and 3-5 of the answers to each question will be correct. You get +1 point for each correct choice you make, and -1 point for each wrong choice. So do not guess!';
		t += '<br/><br/>';
		t += '<input type="button" onclick="subtest_V.userReady();" value="Start"></input>';
		t += '</div>';

		t += '<div id="vdisplay" style="display:none;">';
		t += '<div id="vqdisp" style="font-size:200%;margin:0 auto;width:155px;text-align: center;">';
		t += '</div>';
		t += '<div style="display: flex;justify-content: center;">';
		t += '<div style="display: inline-block;border:2px solid #B0C4DE;padding:0px;background-color:#F0F8FF;font-size:80%;margin-top:20px;">';
		t += '<div style="background-color:#B0C4DE;padding:5px;">';
		t += '	Which of these mean the same as above?';
		t += '</div>';
		t += '<table cellpadding="3">';
		t += '<tr>';
		t += '<td>';
		t += '	<label><input id="v_ans1" type="checkbox" value="1" /><span id="Q1Disp"></span></label>';
		t += '</td>';
		t += '<td>';
		t += '	<label><input id="v_ans2" type="checkbox" value="1" /><span id="Q2Disp"></span></label>';
		t += '</td>';
		t += '</tr>';
		t += '<tr>';
		t += '<td>';
		t += '	<label><input id="v_ans3" type="checkbox" value="1" /><span id="Q3Disp"></span></label>';
		t += '</td>';
		t += '<td>';
		t += '	<label><input id="v_ans4" type="checkbox" value="1" /><span id="Q4Disp"></span></label>';
		t += '</td>';
		t += '</tr>';
		t += '<tr>';
		t += '<td>';
		t += '	<label><input id="v_ans5" type="checkbox" value="1" /><span id="Q5Disp"></span></label>';
		t += '</td>';
		t += '<td>';
		t += '	<label><input id="v_ans6" type="checkbox" value="1" /><span id="Q6Disp"></span></label>';
		t += '</td>';
		t += '</tr>';
		t += '</tr>';
		t += '<tr>';
		t += '<td>';
		t += '	<label><input id="v_ans7" type="checkbox" value="1" /><span id="Q7Disp"></span></label>';
		t += '</td>';
		t += '<td>';
		t += '	<label><input id="v_ans8" type="checkbox" value="1" /><span id="Q8Disp"></span></label>';
		t += '</td>';
		t += '</tr>';

		t += '<tr>';
		t += '<td>';
		t += ' <br/><input type="button" value="Next" onclick="subtest_V.qanswer()" />';
		t += '</td>';
		t += '<td>';
		t += '	';
		t += '</td>';
		t += '</tr>';

		t += '</table>';
		t += '</div>';
		t += '</div>';
		t += '</div>';



		document.getElementById(this.targetContainer).innerHTML = t;
	}
}
