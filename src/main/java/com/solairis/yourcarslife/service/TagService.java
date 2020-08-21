/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.service;

import com.solairis.yourcarslife.data.dao.TagDao;
import com.solairis.yourcarslife.data.domain.Tag;
import com.solairis.yourcarslife.data.input.TagInputData;
import java.util.Set;

/**
 *
 * @author Joshua Johnson
 */
public class TagService {

	private TagDao tagDao;

	public Tag getTag(long tagId) {
		return this.tagDao.getTag(tagId);
	}

	public void save(Tag tag) {
		this.tagDao.save(tag);
	}

	public Set<Tag> getTagsForUser(long userId) {
		TagInputData inputData = new TagInputData();
		inputData.setUserId(userId);
		return this.tagDao.getTags(inputData);
	}

	public void setTagDao(TagDao tagDao) {
		this.tagDao = tagDao;
	}

}
