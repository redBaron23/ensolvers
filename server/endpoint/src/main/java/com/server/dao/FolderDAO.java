package com.server.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.server.model.Folder;

public interface FolderDAO extends JpaRepository<Folder, Integer>{

}
