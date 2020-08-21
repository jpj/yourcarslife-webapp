/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.data.dao.impl;

import com.solairis.yourcarslife.data.dao.TagDao;
import com.solairis.yourcarslife.data.domain.Tag;
import com.solairis.yourcarslife.data.input.TagInputData;
import java.util.HashSet;
import java.util.Set;
import java.util.TreeSet;
import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;

/**
 *
 * @author Joshua Johnson
 */
public class TagDaoHibernate implements TagDao {

	private SessionFactory sessionFactory;

	@Override
	public Tag getTag(long tagId) {
		return (Tag)this.sessionFactory.getCurrentSession().load(Tag.class, tagId);
	}

	@Override
	public Set<Tag> getTags(TagInputData inputData) {
		Criteria criteria = this.sessionFactory.getCurrentSession().createCriteria(Tag.class);
		if (inputData != null) {
			if (inputData.getUserId() != null) {
				criteria.createCriteria("user").add(Restrictions.eq("userId", inputData.getUserId()));
			}
		}
		return new HashSet<Tag>(criteria.list());
	}

	@Override
	public void save(Tag tag) {
		this.sessionFactory.getCurrentSession().saveOrUpdate(tag);
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

}
