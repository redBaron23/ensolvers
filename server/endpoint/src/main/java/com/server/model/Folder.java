package com.server.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Folder {

	


	@Id
	private String folderName;
	

	@Column
	private String items;


	public String getFolder_name() {
		return folderName;
	}


	public void setFolder_name(String folder_name) {
		this.folderName = folder_name;
	}


	public String getItems() {
		return items;
	}


	public void setItems(String items) {
		this.items = items;
	}

	


}
