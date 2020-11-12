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
	public void saveFolder(@RequestBody Folder folder) {
		folder.setItems("[]");
		folderDAO.save(folder);
	}
	
	@GetMapping("/folders")
	public List<Folder> getFolder(){
		return folderDAO.findAll();
	}
	
	@DeleteMapping("/folders")
	public void deleteFolder(@RequestBody Folder folder) {
		folderDAO.delete(folder);;
	}
	
	
	
	//
	//Items
	//
	
	
	@PostMapping("/items")
	public void saveItem(@RequestBody Folder reqFolder){

		
			//Just insert one
			String item = reqFolder.getItems();

			String folderName = reqFolder.getFolder_name();
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
	public void deleteItem(@RequestBody Folder reqFolder){

		
			//Just insert one
			String item = reqFolder.getItems();

			String folderName = reqFolder.getFolder_name();
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
	public String getItems(@RequestParam String folder_name){
		JSONArray items = new JSONArray();
		List<Folder> folders = folderDAO.findAll();
		for (Folder folder : folders) {
			if(folder.getFolder_name().equals(folder_name)) {
				items.put(folder.getItems());
			}
		}
		return items.toString();
	}
	

}
