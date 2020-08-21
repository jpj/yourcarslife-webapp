/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.solairis.yourcarslife.data.dao.impl;

import com.solairis.yourcarslife.data.dao.VehicleDao;
import com.solairis.yourcarslife.data.domain.Vehicle;
import com.solairis.yourcarslife.data.exception.VehicleDaoException;
import com.solairis.yourcarslife.data.input.VehicleInputData;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;

/**
 *
 * @author josh
 */
public class VehicleDaoHibernate implements VehicleDao {

	private SessionFactory sessionFactory;

	@Override
	public Vehicle getVehicle(long vehicleId) throws VehicleDaoException {
		Vehicle vehicle = null;
		try {
			Criteria criteria = this.sessionFactory.getCurrentSession().createCriteria(Vehicle.class);
			criteria.add(Restrictions.eq("vehicleId", vehicleId));
			vehicle = (Vehicle)criteria.uniqueResult();
		} catch (HibernateException e) {
			throw new VehicleDaoException(e);
		}
		return vehicle;
	}

	@Override
	public List<Vehicle> getVehicles(VehicleInputData inputData) throws VehicleDaoException {
		List<Vehicle> vehicles = null;

		try {
			Criteria criteria = this.sessionFactory.getCurrentSession().createCriteria(Vehicle.class);

			if (inputData != null) {
				if (inputData.getName() != null) {
					criteria.add(Restrictions.eq("name", inputData.getName()));
				}
				if (inputData.getUserId() > 0) {
					criteria.createCriteria("user").add(Restrictions.eq("userId", inputData.getUserId()));
				}
				if (inputData.getVehicleId() > 0) {
					criteria.add(Restrictions.eq("vehicleId", inputData.getVehicleId()));
				}
			}

			vehicles = criteria.list();
		} catch (HibernateException e) {
			throw new VehicleDaoException(e);
		}

		return vehicles;
	}

	@Override
	public void saveVehicle(Vehicle vehicle) throws VehicleDaoException {
		try {
			this.sessionFactory.getCurrentSession().saveOrUpdate(vehicle);
		} catch (HibernateException e) {
			throw new VehicleDaoException(e);
		}
	}

	@Override
	public void delete(Vehicle vehicle) throws VehicleDaoException {
		try {
			this.sessionFactory.getCurrentSession().delete(vehicle);
		} catch (HibernateException e) {
			throw new VehicleDaoException(e);
		}
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

}
