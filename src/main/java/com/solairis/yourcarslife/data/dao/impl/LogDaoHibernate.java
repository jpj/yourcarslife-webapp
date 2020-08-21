/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.data.dao.impl;

import com.solairis.yourcarslife.data.dao.LogDao;
import com.solairis.yourcarslife.data.exception.LogDaoException;
import com.solairis.yourcarslife.data.domain.Log;
import com.solairis.yourcarslife.data.domain.FuelLog;
import com.solairis.yourcarslife.data.input.LogInputData;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

/**
 *
 * @author josh
 */
public class LogDaoHibernate implements LogDao {

	private SessionFactory sessionFactory;

	@Override
	public Log getLog(long logId) throws LogDaoException {
		try {
			Criteria criteria = this.sessionFactory.getCurrentSession().createCriteria(Log.class);
			criteria.add(Restrictions.eq("logId", logId));
			return (Log) criteria.uniqueResult();
		} catch (HibernateException e) {
			throw new LogDaoException(e);
		}
	}

	@Override
	public List<? extends Log> getLogs(LogInputData inputData) throws LogDaoException {
		try {
			Criteria criteria;

			if (inputData != null && inputData.getLogType() != null) {
				criteria = this.sessionFactory.getCurrentSession().createCriteria(inputData.getLogType());
			} else {
				criteria = this.sessionFactory.getCurrentSession().createCriteria(Log.class);
			}

			if (inputData != null) {
				if (inputData.getVehicleId() != null) {
					criteria.createCriteria("vehicle").add(Restrictions.eq("vehicleId", inputData.getVehicleId()));
				}
				if (inputData.getLogId() != null) {
					criteria.add(Restrictions.eq("logId", inputData.getLogId()));
				}
				if (inputData.getActive() != null) {
					criteria.add(Restrictions.eq("active", inputData.getActive()));
				}
				if (inputData.getNumResults() > 0) {
					criteria.setMaxResults(inputData.getNumResults());
				}

				criteria.setFirstResult(inputData.getOffset());
			}

			criteria.addOrder(Order.desc("odometer"));
			criteria.addOrder(Order.desc("logDate"));

			return criteria.list();
		} catch (HibernateException e) {
			throw new LogDaoException(e);
		}
	}

	@Override
	public void save(Log log) throws LogDaoException {
		try {
			this.sessionFactory.getCurrentSession().saveOrUpdate(log);
		} catch (HibernateException e) {
			throw new LogDaoException(e);
		}
	}

	@Override
	public int getLogCount(LogInputData inputData) throws LogDaoException {
		try {
			Criteria criteria = this.sessionFactory.getCurrentSession().createCriteria(Log.class);
			if (inputData.getVehicleId() > 0) {
				criteria.createCriteria("vehicle").add(Restrictions.eq("vehicleId", inputData.getVehicleId()));
			}
			if (inputData.getActive() != null) {
				criteria.add(Restrictions.eq("active", inputData.getActive()));
			}
			criteria.setProjection(Projections.rowCount());
			return ((Integer) criteria.uniqueResult()).intValue();
		} catch (HibernateException e) {
			throw new LogDaoException(e);
		}
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
}
