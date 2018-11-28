<?php
	if (isset($_POST['insert'])) {
		$xml = new DomDocument("1.0,"UTF-8");
		$xml->load('studentdb.xml');
		
		$cname = $_POST['c_name'];
		$hadd = $_POST['h_add'];
		
		$rootTag = $xml->getElementByTagName("roo")->item(0);
		
		$infoTag = $xml->createElement("info");
			$nameTag = $xml->createElement("name", $cname);
			$addTag = $xml->createElement("address", $hadd);
			
			$infoTag->appendChild($nameTag);
			$infoTag->appendChild($addTag);
			
		$rootTag->appendChild($nametag);
		$xml->save('studentdb.xml');
	}
?>


<html>
	<body>
		<form method = "POST" action = "insertxml.php">
		Stud Info</br>
		FNAME <input type = "text" name = "c_name"></br>
		add <input type = "text" name = "h_add"></br>
		<input type = "submit" name "insert" value = "add">
		</form>
	</body>
</html>