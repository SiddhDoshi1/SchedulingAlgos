function RoundRobin(Processes,TQ){
    if(isNaN(TQ))
    {
        TQ=1;
    }
    Processes.sort((a, b) => a.arrival - b.arrival);
    const Gantt_Chart=document.getElementById("Gantt_Chart");
    const Gantt_Chart1=document.getElementById("Gantt_Chart1");
    Gantt_Chart.textContent="";
    Gantt_Chart1.textContent="";
    var currtime=0,index=0,avgTAT=0,avgWT=0;
    var queue=[];
    while(queue.length>0 || index<Processes.length)
    {
        // console.log(queue.length);
        while(index<Processes.length && currtime>=Processes[index].arrival)
        {
            queue.push(Processes[index]);
            index++;
        }
        // console.log(queue.length);
        if(queue.length==0)
        {
            var li1=document.createElement('li');
            var li2=document.createElement('li');
            li1.textContent="NO";
            li1.style.backgroundColor='red';
            //console.log(li1);
            Gantt_Chart.appendChild(li1);
            currtime=Processes[index].arrival;
            li2.textContent=currtime;
            li2.style.backgroundColor='red';
            Gantt_Chart1.appendChild(li2);
        }
        else
        {
            var li=document.createElement('li');
            var li2=document.createElement('li');
            var process=queue.shift();
            //console.log(process.name);
            li.textContent=process.name;
            li.style.backgroundColor='blue';
            li2.style.backgroundColor='blue';
            Gantt_Chart.appendChild(li);
            currtime+=Math.min(TQ,process.burst);
            li2.textContent=currtime;
            Gantt_Chart1.appendChild(li2);
            process.burst-=TQ;
            // console.log(process.burst);
            // console.log("currtime: " + currtime);
            while(index<Processes.length && currtime>=Processes[index].arrival)
            {
                queue.push(Processes[index]);
                index++;
            }
            //console.log(queue.length);
            if(process.burst>0)
            {
                queue.push(process);
            }
            else
            {
                var FT=currtime;
                var TAT=FT-process.arrival;
                avgTAT+=TAT;
                var WT=TAT-process.fburst;
                avgWT+=WT;
                addProcessToTable(process.priority,process.name,process.arrival,process.fburst,FT,TAT,WT);
            }
        }
    }
    if(Processes.length>0)
    {
        avgTAT/=Processes.length;
        avgWT/=Processes.length;
        addProcessToTable("","","","","",`AvgTAT = ${avgTAT}`,`AvgWT = ${avgWT}`);
    }
}