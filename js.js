
function openclose(id)
{
	var obj = $(id);
	if(obj == null) return;

	obj.toggle();
	
}

function liczNiepew()
{
	var niepew = $("#niepewnosc").val();
	
	while(niepew.indexOf(",") != -1) niepew = niepew.replace(",", ".");
	while(niepew.indexOf("  ") != -1) niepew = niepew.replace("  ", " ");
	while(niepew.indexOf("	") != -1) niepew = niepew.replace("	", " ");
	
	$("#niepewnosc").val(niepew);
	
	niepew = niepew.split(" ");

	if(dlugosc < 2){
		return;
	}

	var suma = 0;
	var niepa = 0;
	var odch = 0;
	var dlugosc = niepew.length;
	var mathematici = "{";

	for(var a = 0; a < dlugosc; a++)
	{
		var temp = parseFloat(niepew[a]);
		suma += temp;
		
		if(a!=0) mathematici += ",";
		mathematici += niepew[a];
	} 
	mathematici+="}";


	var srednia = suma/dlugosc;

	for(var a = 0; a < dlugosc; a++)
	{
		var temp = parseFloat(niepew[a]);

		niepa += Math.pow(temp - srednia, 2);
	} 

	odch = niepa;

	niepa = Math.sqrt(niepa/(dlugosc * (dlugosc-1)));
	odch = Math.sqrt(odch/dlugosc);

	$("#niepewnosc-ilosc").html(dlugosc);
	$("#niepewnosc-suma").html(suma);
	$("#niepewnosc-srednia").html(srednia);
	$("#niepewnosc-niepa").html(niepa);
	$("#niepewnosc-wzg").html(((niepa/srednia)*100)+"%");
	$("#niepewnosc-odch").html(odch);
	$("#niepewnosc-mathematici").html(mathematici);
}

function laplace(array)
{
	if(array.length == 1)
	{
		return array[0][0];
	}else
	if(array.length == 2)
	{
		return ((array[0][0]*array[1][1]) - (array[1][0]*array[0][1]));
	}else
	{
		var wyzn = 0;

		for(var a = 0; a < array.length; a++)
		{
			var arr = new Array(array.length -1);

			for(var b = 1; b < array.length; b++)
			{
				var tempa = new Array(array.length-1);
				for(var c = 0; c < array.length; c++)
				{
					if(c == a) continue;
					tempa[c < a ? c : c-1] = array[b][c];
				}
				arr[b-1] = tempa;
			}
			wyzn += (a%2 == 0 ? 1 : -1)*array[0][a]*laplace(arr);
		}

		return wyzn;
	}	
	

}

function mnoz(array, array2)
{
	if(array.length == array2[0].length && array[0].length == array2.length)
	{
		var temparr = new Array(array.length);

		for(var a = 0; a < array.length; a++)
		{
			temparr[a] = new Array(array[0].length);

			for(var b = 0; b < array[0].length; b++)
			{
				var s = 0;
				for(var c = 0; c < array2[0].length; c++)
				{
					s += array[a][c] * array2[c][b];
				}

				temparr[a][b] = s;

			}

		}	

		return temparr;	

	}
}

function dodajmnoz()
{
	var array = getArr("#matrix-input");
	
	var array2 = getArr("#matrix-2nd");

	if(array.length == array2.length && array[0].length == array2[0].length)
	{
		var str = "";
		for(var a = 0; a < array.length; a++)
		{
			for(var b = 0; b < array[0].length; b++)
			{
				str += (parseFloat(array[a][b])+parseFloat(array2[a][b])) + " ";
			}
			str += "\n";
		}

		$("#matrix-sum").html(str);
	}

	var mnozon = mnoz(array, array2);
	
	if(mnozon != null)
	{
		var str = "";
		for(var a = 0; a < mnozon.length; a++)
		{
			for(var b = 0; b < mnozon[a].length; b++)
			{
				str += parseFloat(mnozon[a][b]) + " ";
			}
			str += "\n";
		}

		$("#matrix-il").html(str);
	}
	
}

function transpose(array)
{
	var arr = new Array(array[0].length);
	

	for(var a = 0; a < arr.length; a++)
	{
		arr[a] = new Array(array.length);
	}

	for(var a = 0; a < array.length; a++)
	{
		for(var b = 0; b < array[a].length; b++)
		{
			arr[b][a] = array[a][b];
		}
	}

	return arr;
	
}

function getArr(id)
{
	var matrix = $(id).val();

	var rows = matrix.split("\n");
	
	if(rows.length < 1) return;

	var array = new Array(rows.length);


	for(var a = 0; a < rows.length; a++)
	{
		var cols = rows[a].split(" ");
		array[a] = cols;
	}

	return array;

}

function liczWyz()
{

	var niepew = $("#matrix-input").val();
	
	while(niepew.indexOf(",") != -1) niepew = niepew.replace(",", ".");
	while(niepew.indexOf("  ") != -1) niepew = niepew.replace("  ", " ");
	while(niepew.indexOf("	") != -1) niepew = niepew.replace("	", " ");
	
	$("#matrix-input").val(niepew);	
	
	var array = getArr("#matrix-input");

	
	var mathematica = "{";
	var firster = true;
	
	array.forEach(function(row){
		
		if(firster) firster = false
		else mathematica +=",";
		
		mathematica += "{";
		var first = true;
		row.forEach(function(cell){
			if(first) first = false;
			else{
				mathematica += ",";
			}
			
			mathematica += cell;
		});
		mathematica += "}";
	});
	mathematica += "}";
	
	$("#matrix-mathematica").html(mathematica);

	var square = true;
	var trace = 0;
	
	for(var a = 0; a < array.length; a++)
	{
		if(array[a].length != array.length)
		{
			square = false;
		}
		else{
			trace += parseFloat(array[a][a]);
		}
	}

	if(square){
		var wyz = laplace(array);
	
		$("#matrix-wyzn").html(wyz);
		$("#matrix-trace").html(trace);
	}

	var transposed = transpose(array);
	var html = "";
	for(var a = 0; a < transposed.length; a++)
	{
		for(var b = 0; b < transposed[a].length; b++)
		{
			html += transposed[a][b] + " ";
		}
		html += "\n";
	}
	$("#matrix-t").html(html);
}
