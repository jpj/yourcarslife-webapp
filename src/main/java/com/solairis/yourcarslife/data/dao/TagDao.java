/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.data.dao;

import com.solairis.yourcarslife.data.domain.Tag;
import com.solairis.yourcarslife.data.input.TagInputData;
import java.util.Set;

/**
 *
 * @author JanieBear
 */
public interface TagDao {

	public Tag getTag(long tagId);
	public void save(Tag tag);
	public Set<Tag> getTags(TagInputData inputData);

}
