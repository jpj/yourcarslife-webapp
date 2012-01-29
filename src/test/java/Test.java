
import com.solairis.yourcarslife.data.dao.UserDao;
import com.solairis.yourcarslife.data.domain.User;
import org.junit.Assert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author JanieBear
 */
@ContextConfiguration(locations="classpath:yourcarslife-servlet.xml")
public class Test extends AbstractTransactionalJUnit4SpringContextTests {
    
    @Autowired
    private UserDao userDao;
    
    @org.junit.Test
    public void getUser() {
        User user = this.userDao.getUser(1);
        Assert.assertNotNull(user);
    }
    
}
