<?php

/**
* FiveMin Video Suggest
* Written by Ady Levy
*/

	class FiveminVideoSuggestCls {
		const APIURL = "http://api.5min.com/videoSeed/videos.json?sid=203&url=";
		const APISEARCHCALL ="http://api.5min.com/search/";
		const MAX_AMMOUNT_OF_VIDEOS = 10;
		
		public function FiveminVideoSuggestCls($apikey = null) {
			return true;
		}
		
		public function getVideos($content,$title=null) {
			$response = $this->callFiveMin($content,$title);
			//$x = json_decode($response);
			return $response;
		}
		public function getSearchResults($term) {
			$response = $this->callFiveMinSearch($term);
			
			return $response;
		}
		
		
		private function callFiveMinSearch($searchTerm){
		
			$fiveMinApiCallUrl = self::APISEARCHCALL.$searchTerm."/videos.json?sid=203&num_of_videos=".self::MAX_AMMOUNT_OF_VIDEOS;
			$curl_handle = curl_init();
			curl_setopt($curl_handle, CURLOPT_URL, $fiveMinApiCallUrl);
			curl_setopt($curl_handle, CURLOPT_CONNECTTIMEOUT, 2);
			curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, 1);
			$response = curl_exec($curl_handle);
			curl_close($curl_handle);
			
			if (empty($response)){
				return '{"success": false,"error": "Error reciving data from 5min (api url:'.$fiveMinApiCallUrl.'."}';
			} else {
				return $response;
			}
		}

		
		private function callFiveMin($content, $title = null) {
			$content = $this->html2txt($content);
			$title = $this->html2txt($title);
			$content = "<h1>".$title."</h1>".$content;

			
			$htmlStart=<<<EOT
			<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"><html><head></head><body><div style='width:900px;margin:0 auto;'>
EOT;
			$htmlEnd="</div></body></html>";
			$text = $htmlStart.$content.$htmlEnd;
			
			$upload_dir = wp_upload_dir();
			$theFileName ="/5minContent".rand(1,99999999).".html";
			$uploadsPath=$upload_dir['url'];
			$filename=  $upload_dir['path'].$theFileName;
			
			if (!$handle = fopen($filename, 'w')) {
				echo '{"success": false,"error": "Error opening file."}';
			    die();
			}

			// Write html to our temp file.
			if (fwrite($handle, $text) === FALSE) {
				echo '{"success": false,"error": "Cannot write to file."}';
			    die();
			}
			
			fclose($handle);
			
			$fiveMinApiCallUrl = self::APIURL.$uploadsPath.$theFileName."&num_of_videos=".self::MAX_AMMOUNT_OF_VIDEOS;//."&sid=142";
			
			//$fiveMinApiCallUrl = "http://syn.5min.com/handlers/SenseHandler.ashx?func=GetResults&sid=142&NumOfColumnsAsked=3&NumOfRowsAsked=1&isnewts=true&url=".$uploadsPath.$theFileName;
			
			//print($fiveMinApiCallUrl);
			$curl_handle = curl_init();
			curl_setopt($curl_handle, CURLOPT_URL, $fiveMinApiCallUrl);
			curl_setopt($curl_handle, CURLOPT_CONNECTTIMEOUT, 2);
			curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, 1);
			$response = curl_exec($curl_handle);
			curl_close($curl_handle);
			
			// delete our temp file here .
			unlink($filename);
			//return '{"success": false, "error":"'.$fiveMinApiCallUrl.'"}';
			if (empty($response)){
				return '{"success": false,"error": "Error reciving data from 5min (api url:'.$fiveMinApiCallUrl.'."}';
			} else {
				return $response;
			}
		}
		
		function html2txt($document){
			$search = array('@<script[^>]*?>.*?</script>@si',  // Strip out javascript
				/*'@<[\/\!]*?[^<>]*?>@si',            // Strip out HTML tags*/
				'@<style[^>]*?>.*?</style>@siU',    // Strip style tags properly
				'@<![\s\S]*?--[ \t\n\r]*>@'         // Strip multi-line comments including CDATA
			);
			$text = preg_replace($search, '', $document);
			return $text;
		} 	
		
		function cleanup($text){
			$text = preg_replace('/&.+?;\'"/', '', $text);
			$text = preg_replace ("/[^a-zA-Z ]/", "", $text);
			return $text;
		}	

		
	}

?>