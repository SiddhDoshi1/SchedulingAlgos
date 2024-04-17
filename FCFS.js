function FCFS(Processes){
    Processes.sort((a, b) => a.arrival - b.arrival);
    const Gantt_Chart=document.getElementById("Gantt_Chart");
    const Gantt_Chart1=document.getElementById("Gantt_Chart1");
    Gantt_Chart.textContent="";
    Gantt_Chart1.textContent="";
    var currtime=0,avgTAT=0,avgWT=0;
    Processes.forEach(process => {
        var li=document.createElement('li');
        var li3=document.createElement('li');
        if(currtime<process.arrival)
        {
            var li1=document.createElement('li');
            var li2=document.createElement('li');
            li1.textContent="NO";
            li1.style.backgroundColor='red';
            li2.style.backgroundColor='red';
            currtime=process.arrival;
            li2.textContent=currtime;
            console.log(li1);
            Gantt_Chart.appendChild(li1);
            Gantt_Chart1.appendChild(li2);
        }
        console.log(process.name);
        li.textContent=process.name;
        li.style.backgroundColor='blue';
        li3.style.backgroundColor='blue';
        currtime+=process.burst;
        li3.textContent=currtime;
        Gantt_Chart.appendChild(li);
        Gantt_Chart1.appendChild(li3);
        var FT=currtime;
        var TAT=FT-process.arrival;
        avgTAT+=TAT;
        var WT=TAT-process.burst;
        avgWT+=WT;
        addProcessToTable(process.priority,process.name,process.arrival,process.fburst,FT,TAT,WT);
    });
    if(Processes.length>0)
    {
        avgTAT/=Processes.length;
        avgTAT=avgTAT.toFixed(2);
        avgWT/=Processes.length;
        avgWT=avgWT.toFixed(2);
        addProcessToTable("","","","","",`AvgTAT = ${avgTAT}`,`AvgWT = ${avgWT}`);
    }
}