package com.server.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.json.*;
import com.server.dao.FolderDAO;
import com.server.model.Folder;
import java.util.List;

@RestController
@RequestMapping("api")
public class FolderRest {
	
	@Autowired
	private FolderDAO folderDAO;
	
	
	

	//Folders
	
	@PostMapping("/folders")
	public void saveFolder(@RequestBody String rawJson) {
		JSONObject json = new JSONObject(rawJson);
		String folderName = json.getString("folderName");
		Folder folder = new Folder();
		folder.setFolder_name(folderName);
		folder.setItems("[]");
		folderDAO.save(folder);
	}
	
	@GetMapping("/folders")
	public String getFolder(){
		List<Folder> folders = folderDAO.findAll();
		JSONArray folderNames = new JSONArray();
		
		for (Folder folder : folders) {
			folderNames.put(folder.getFolder_name());
		}
		return folderNames.toString();
	}
	
	@DeleteMapping("/folders")
	public void deleteFolder(@RequestBody String rawJson) {
		
		//Parse camelCase
		JSONObject json = new JSONObject(rawJson);
		String folderName = json.getString("folderName");
		Folder folder = new Folder();
		folder.setFolder_name(folderName);
		
		
		folderDAO.delete(folder);
	}
	
	
	
	//
	//Items
	//
	
	
	@PostMapping("/items")
	public void saveItem(@RequestBody String rawJson){
		
		
			//Parse camelCase
			JSONObject json = new JSONObject(rawJson);
			String folderName = json.getString("folderName");
			Folder reqFolder = new Folder();
			reqFolder.setFolder_name(folderName);
		
			//Just insert one
			String item = json.getString("item");

			JSONArray items;
			List<Folder> folders = folderDAO.findAll();
			for (Folder folder : folders) {

				if(folder.getFolder_name().equals(folderName)) {
					items = new JSONArray(folder.getItems());
					
					items.put(item);
					
					//Save to DB
					folder.setItems(items.toString());
					folderDAO.save(folder);
					
					break;
				}
			}
	}
	
	
	@DeleteMapping("/items")
	public void deleteItem(@RequestBody String rawJson){
		
		
			//Parse camelCase
			JSONObject json = new JSONObject(rawJson);
			String folderName = json.getString("folderName");
			Folder reqFolder = new Folder();
			reqFolder.setFolder_name(folderName);
		
			//Just insert one
			String item = json.getString("item");
		

			JSONArray items;
			List<Folder> folders = folderDAO.findAll();
			for (Folder folder : folders) {

				if(folder.getFolder_name().equals(folderName)) {
					items = new JSONArray(folder.getItems());
					
					//Run over the array
					for (int i = 0; i < items.length(); i++) {
						//If it has it i delete it
						if( items.get(i).equals(item)) {
							items.remove(i);
							
							//save to db
							folder.setItems(items.toString());
							folderDAO.save(folder);
							break;
						}
					}
					/*
					items.put(item);
					
					//Save to DB
					folder.setItems(items.toString());
					folderDAO.save(folder);*/
				}
			}
	}
	
	@GetMapping("/items")
	public String getItems(@RequestParam String folderName){
		JSONArray items = new JSONArray();
		List<Folder> folders = folderDAO.findAll();
		for (Folder folder : folders) {
			if(folder.getFolder_name().equals(folderName)) {
				items.put(folder.getItems());
			}
		}
		return items.toString();
	}
	

}
